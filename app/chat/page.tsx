'use client'
import { useState } from 'react'
import BasicChat from './components/BasicChat'
import BasicChatNotStreaming from '@/app/chat/components/BasicChatNotStreaming'
import Tabs from '@/app/components/ui/Tabs'
import Link from 'next/link'

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
          <div className="mx-auto lg:mx-0 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Basic Chat Example
            </h2>
            <div className="space-y-4">
              <p>
                The vercel AI makes it simple to re-create a basic chat GPT
                clone using the{' '}
                <span className="text-cyan-600">Vercel AI SDK</span>
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
                  Creating a basic chat with streaming responses is really easy
                  using the Vercel AI SDK.
                </p>
                <p>
                  <Link
                    className="text-cyan-600 underline"
                    target="_blank"
                    href="https://vercel.com/docs/functions/streaming"
                  >
                    Why do you want to use streaming data?
                  </Link>
                </p>

                <h5 className="text-bold text-2xl">
                  First we're going to create a new React Component called
                  BasicChat.tsx
                </h5>
                <p>In this component we'll want to do a couple of things</p>
                <ul className="list-disc space-y-4 ml-16">
                  <li>
                    Use "use client" as this will need to be a client rendered
                    component. We'll be streaming data directly from the OpenAI
                    Api
                  </li>
                  <li>
                    We'll be using the useChat hook provided by the Vercel AI
                    SDK which gives us some nice out of the box functionality
                  </li>
                </ul>
                <div className="max-w-7xl">
                  <div className="prose prose-slate max-w-7xl">
                    <pre>
                      <code className="language-js">
                        {`'use client'
import { useChat } from 'ai/react'

export default function BasicChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    // This will default to ./api/chat - but you can point it elsewhere
    // api: './api/chat'
  })
  return (
    <div className='flex flex-col w-full max-w-7xl mx-auto stretch space-y-4'>
      {messages.length > 0
        ? messages.map((m) => (
          <div key='{m.id}' className='whitespace-pre-wrap'>
            <div>
              {m.role === 'user' ? (
                <div className='p-2 bg-rose-200 text-gray-900 font-semibold rounded mb-4'>
                  User
                </div>
              ) : (
                <div className='p-2 bg-emerald-200 text-gray-900 font-semibold rounded mb-4'>
                  AI
                </div>
              )}
            </div>
            <div className='px-8 text-gray-900 font-semibold'>
              {m.content}
            </div>
          </div>
        ))
        : null}

      <form onSubmit='{handleSubmit}'>
        <input
          className='w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl'
          value='{input}'
          placeholder='Say something...'
          onChange='{handleInputChange}'
        />
      </form>
    </div>
  )
}`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl">
              <div className="space-y-4">
                <h5 className="text-bold text-2xl">
                  Next: Create an edge function
                </h5>
                <ul className="list-disc space-y-4 ml-16">
                  <li>Create a .ts edge function in your api directory</li>
                  <li>
                    We will use this function to stream the data from the OpenAI
                    API.
                  </li>
                </ul>
                <div className="max-w-7xl">
                  <div className="prose prose-slate max-w-7xl">
                    <pre>
                      <code className="language-js">
                        {`import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the \`prompt\` from the body of the request
  const { messages } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: messages
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab.id === 'open-ai-demo' && (
          <div className="flex space-x-8">
            <div className="w-full">
              <h2 className="font-semibold mb-2">Streaming Example</h2>
              <BasicChat />
            </div>
            <div className="w-full">
              <h2 className="font-semibold mb-2">No Streaming Example</h2>
              <BasicChatNotStreaming />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
