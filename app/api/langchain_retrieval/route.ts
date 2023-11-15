import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import {
  VectorStoreToolkit,
  createVectorStoreAgent,
  VectorStoreInfo
} from 'langchain/agents'


export async function POST(req: Request) {
  const { inputText } = await req.json()
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      client: supabase,
      tableName: 'nextatx_documents',
      queryName: 'match_nextatx_documents'
    }
  )

  const vectorStoreInfo: VectorStoreInfo = {
    name: 'nfl_recaps',
    description: 'The most recent NFL recaps from the 2023 season',
    vectorStore
  }

  const model = new ChatOpenAI()

  const toolkit = new VectorStoreToolkit(vectorStoreInfo, model)
  const agent = createVectorStoreAgent(model, toolkit)

  const input =
    inputText
  console.log(`Executing: ${input}`)

  const result = await agent.call({ input })
  console.log(`Got output ${result.output}`)
  console.log(
    `Got intermediate steps ${JSON.stringify(result.intermediateSteps, null, 2)}`
  )

  return new Response(JSON.stringify({ message: result }), { status: 200 })
}
