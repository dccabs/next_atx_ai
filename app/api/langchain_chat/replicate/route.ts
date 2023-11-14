import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIMessage, HumanMessage } from 'langchain/schema'
import { Replicate } from 'langchain/llms/replicate'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const { stream, handlers } = LangChainStream()

  console.log({ messages })

  let messageStr = '';
  (messages as Message[]).map(m => {
    if (m.role == 'user') {
      messageStr += `User: ${m.content}`
    } else {
      messageStr += `Assistant: ${m.content}`
    }
  })

  console.log('messageStr', messageStr)


  const model = new Replicate({
    model:
      'a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5'
  })


  const prompt = messageStr

  const res = await model.call(`${prompt}
  Assistant:`)
  console.log({ res })
  /*
    {
      res: "I'm happy to help! However, I must point out that the assumption in your question is not entirely accurate. " +
        + "Woodchucks, also known as groundhogs, do not actually chuck wood. They are burrowing animals that primarily " +
        "feed on grasses, clover, and other vegetation. They do not have the physical ability to chuck wood.\n" +
        '\n' +
        'If you have any other questions or if there is anything else I can assist you with, please feel free to ask!'
    }
  */
  return new StreamingTextResponse(res)
}
