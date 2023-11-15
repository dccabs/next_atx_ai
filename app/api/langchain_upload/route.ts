import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Document } from 'langchain/document'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge'

export async function POST(req: Request) {
  const { inputText } = await req.json()
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  // const { data } = await supabase.from('jobs').select()

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100
  })

  const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: inputText })
  ])

  const embeddings = new OpenAIEmbeddings()

  const store = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: 'nextatx_documents'
  })

  // const docs = [
  //   {
  //     pageContent:
  //       'This is a long text, but it actually means something because vector database does not understand Lorem Ipsum. So I would need to expand upon the notion of quantum fluff, a theorectical concept where subatomic particles coalesce to form transient multidimensional spaces. Yet, this abstraction holds no real-world application or comprehensible meaning, reflecting a cosmic puzzle.',
  //     metadata: { b: 1, c: 10, stuff: 'right' }
  //   },
  //   {
  //     pageContent:
  //       'This is a long text, but it actually means something because vector database does not understand Lorem Ipsum. So I would need to proceed by discussing the echo of virtual tweets in the binary corridors of the digital universe. Each tweet, like a pixelated canary, hums in an unseen frequency, a fascinatingly perplexing phenomenon that, while conjuring vivid imagery, lacks any concrete implication or real-world relevance, portraying a paradox of multidimensional spaces in the age of cyber folklore.',
  //     metadata: { b: 2, c: 9, stuff: 'right' }
  //   },
  //   { pageContent: 'hello', metadata: { b: 1, c: 9, stuff: 'right' } },
  //   { pageContent: 'hello', metadata: { b: 1, c: 9, stuff: 'wrong' } },
  //   { pageContent: 'hi', metadata: { b: 2, c: 8, stuff: 'right' } },
  //   { pageContent: 'bye', metadata: { b: 3, c: 7, stuff: 'right' } },
  //   { pageContent: 'what\'s this', metadata: { b: 4, c: 6, stuff: 'right' } }
  // ]

  // Also supports an additional {ids: []} parameter for upsertion
  await store.addDocuments(docOutput)
  // const vectorStore = await SupabaseVectorStore.fromTexts(
  //   ['Hello world', 'Bye bye', 'What\'s this?'],
  //   [{ id: 2 }, { id: 1 }, { id: 3 }],
  //   new OpenAIEmbeddings(),
  //   {
  //     client: supabase,
  //     tableName: 'nextatx_documents',
  //     queryName: 'match_nextatx_documents'
  //   }
  // )
  // const { messages } = await req.json()
  //
  // // Ask OpenAI for a streaming chat completion given the prompt
  // const response = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   stream: true,
  //   messages: messages
  // })
  //
  // // Convert the response into a friendly text-stream
  // const stream = OpenAIStream(response)
  // Respond with the stream
  return new Response(JSON.stringify(docOutput), { status: 200 })
}
