import { SerpAPI } from 'langchain/tools'
import { PromptTemplate } from 'langchain/prompts'
import { StringOutputParser } from 'langchain/schema/output_parser'

import { ChatOpenAI } from 'langchain/chat_models/openai'

export async function POST(req: Request) {
  const { inputText } = await req.json()

  const llm = new ChatOpenAI({
    streaming: true,
    modelName: 'gpt-4-1106-preview',
  })

  const search = new SerpAPI()

  const prompt =
    PromptTemplate.fromTemplate(`Turn the following user input into a search query for a search engine:
{input}`)

  const model = new ChatOpenAI()

  const chain = prompt.pipe(model).pipe(new StringOutputParser()).pipe(search)

  const result = await chain.invoke({
    input: inputText,
  })

  return new Response(JSON.stringify({ message: result }), { status: 200 })
}
