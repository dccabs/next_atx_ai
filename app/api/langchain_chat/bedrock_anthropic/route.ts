import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { BedrockChat } from 'langchain/chat_models/bedrock'
import { AIMessage, HumanMessage } from 'langchain/schema'

// We can't use edge for the Bedrock model because it's not supported
// export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const { stream, handlers } = LangChainStream()

  const llm = new BedrockChat({
    streaming: true,
    model: 'anthropic.claude-v2',
    region: process.env.AWS_REGION,
    // endpointUrl: 'custom.amazonaws.com',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
    // modelKwargs: {},
  })

  llm
    .call(
      (messages as Message[]).map(m =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      ),
      {},
      [handlers]
    )
    .catch(console.error)

  return new StreamingTextResponse(stream)
}
