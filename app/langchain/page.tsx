'use client'
import { useState } from 'react'
import OpenAIChat from './components/OpenAIChat'
import AnthropicChat from './components/AnthropicChat'
import ReplicateChat from './components/ReplicateChat'
import Upload from './components/Upload'
import Retrieval from './components/Retrieval'
import Tabs from '@/app/components/ui/Tabs'
import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/20/solid'

export default function Chat() {
  const [tabs, setTabs] = useState([
    {
      id: 'instructions',
      name: 'Instructions',
      current: true,
      onClick: () => {
        handleTabSelect('instructions')
      },
    },
    {
      id: 'open-ai-demo',
      name: 'Open AI Demo',
      current: false,
      onClick: () => {
        handleTabSelect('open-ai-demo')
      },
    },
    {
      id: 'anthropic-demo',
      name: 'Anthropic Demo',
      current: false,
      onClick: () => {
        handleTabSelect('anthropic-demo')
      },
    },
    {
      id: 'replicate-demo',
      name: 'Replicate Demo',
      current: false,
      onClick: () => {
        handleTabSelect('replicate-demo')
      },
    },
  ])

  const handleTabSelect = (id) => {
    const tabsCopy = [...tabs]
    const activeTab = tabsCopy.find((tab) => tab.current)
    const tab = tabsCopy.find((tab) => tab.id === id)
    tab.current = true
    activeTab.current = false
    setTabs(tabsCopy)
  }

  const activeTab = tabs.find((tab) => tab.current)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
        <div className="max-w-7xl">
          <div className="mb-8">
            <Link className="" href={`/`}>
              <HomeIcon className="h-12 w-12 cursor-pointer" />
            </Link>
          </div>
          <div className="mx-auto lg:mx-0 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Langchain Chat Examples
            </h2>
            <div className="space-y-4">
              <p>
                Langchain is a software library designed to facilitate the
                creation of applications that utilize large language models
                (LLMs) like OpenAI's GPT models, Antropic Models, and Replicate
                Models.
              </p>
            </div>
          </div>
        </div>
        <Tabs tabs={tabs} />
        {activeTab.id === 'instructions' && (
          <>
            <div className="max-w-7xl">
              <div className="space-y-4">
                <p>
                  We can continue to use the useChat hook provided by the Vercel
                  AI SDK to create a chat component that
                </p>
                <p>
                  In our edge/serverless functions will use langchain to invoke
                  our LLM's instead of directly invoking the Vercel AI
                  OpenAIChat component.
                </p>
                <p>
                  This can make it easier for switching between models for
                  different tasks. For example, you may not need the power of
                  Open AI's GPT-4 for everything. You might be able to use a
                  cheaper model like GPT 3.5, Anthropic, or Replicate
                </p>
                <div className="space-y-8 py-8">
                  <div>
                    <h5 className="text-bold text-2xl">Open AI Example</h5>
                    <div className="max-w-7xl">
                      <div className="prose prose-slate max-w-7xl">
                        <pre>
                          <code className="language-js">
                            {`
import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIMessage, HumanMessage } from 'langchain/schema'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const { stream, handlers } = LangChainStream()

  const llm = new ChatOpenAI({
    streaming: true,
    modelName: 'gpt-4'
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
`}
                          </code>
                        </pre>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-bold text-2xl mt-8 block">
                        Anthropic with AWS Bedrock Example
                      </h5>
                      <div className="max-w-7xl">
                        <div className="prose prose-slate max-w-7xl">
                          <pre>
                            <code className="language-js">
                              {`
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
`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-bold text-2xl mt-8 block">
                        Replicate Example
                      </h5>
                      <div className="max-w-7xl">
                        <div className="prose prose-slate max-w-7xl">
                          <pre>
                            <code className="language-js">
                              {`
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
      messageStr += \`User: \${m.content}\`
    } else {
      messageStr += \`Assistant: \${m.content}\`
    }
  })

  const model = new Replicate({
    model:
      'a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
  })

  const prompt = messageStr

  const res = await model.call(\`${prompt}
  Assistant:\`)
  return new StreamingTextResponse(res)
}
`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab.id === 'open-ai-demo' && <OpenAIChat />}
        {activeTab.id === 'anthropic-demo' && <AnthropicChat />}
        {activeTab.id === 'replicate-demo' && <ReplicateChat />}
      </div>
    </div>
  )
}
