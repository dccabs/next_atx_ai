import OpenAI from 'openai'

import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { BufferMemory } from 'langchain/memory'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { RetrievalQAChain } from 'langchain/chains'
import {
  VectorStoreToolkit,
  createVectorStoreAgent,
  VectorStoreInfo
} from 'langchain/agents'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  const { inputText } = await req.json()
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { stream, handlers } = LangChainStream()

  // const client = createClient(url, privateKey);

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    // ['Hello world', 'Bye bye', 'What\'s this?'],
    // [{ id: 2 }, { id: 1 }, { id: 3 }],
    new OpenAIEmbeddings(),
    {
      client: supabase,
      tableName: 'nextatx_documents',
      queryName: 'match_nextatx_documents'
    }
  )

  const resultOne = await vectorStore.similaritySearch('Dak Prescott', 10)

  const vectorStoreInfo: VectorStoreInfo = {
    name: 'nfl_recaps',
    description: 'The most recent NFL recaps from the 2023 season',
    vectorStore
  }

  const model = new ChatOpenAI()

  const toolkit = new VectorStoreToolkit(vectorStoreInfo, model)
  const agent = createVectorStoreAgent(model, toolkit)

  const input =
    'What was the most lopsided score in these games?'
  console.log(`Executing: ${input}`)

  const result = await agent.call({ input })
  console.log(`Got output ${result.output}`)
  console.log(
    `Got intermediate steps ${JSON.stringify(result.intermediateSteps, null, 2)}`
  )

  // console.log('result', result)
  // const { data } = await supabase.from('jobs').select()

  return new Response(JSON.stringify(result), { status: 200 })
}
