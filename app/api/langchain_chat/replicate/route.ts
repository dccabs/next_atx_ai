import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIMessage, HumanMessage } from 'langchain/schema'
import { Replicate } from 'langchain/llms/replicate'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  // Replicate via langchain doesn't currently support streaming
  // const { stream, handlers } = LangChainStream()

  // Replicate needs a string vs. an array of messages
  let messageStr = ''
  ;(messages as Message[]).map((m) => {
    if (m.role == 'user') {
      messageStr += `User: ${m.content}`
    } else {
      messageStr += `Assistant: ${m.content}`
    }
  })

  const model = new Replicate({
    model:
      'a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
  })

  const prompt = messageStr

  const res = await model.call(`${prompt}
  Assistant:`)
  return new StreamingTextResponse(res)
}
