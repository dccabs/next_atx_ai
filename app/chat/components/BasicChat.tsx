'use client'
import { useChat } from 'ai/react'

export default function BasicChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    // This will default to ./api/chat - but you can point it elsewhere
    // api: './api/chat'
  })

  return (
    <div className="flex flex-col w-full space-y-4 max-w-2xl">
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                {m.role === 'user' ? (
                  <div className="p-2 bg-gray-200 text-gray-900 font-semibold rounded mb-4">
                    User
                  </div>
                ) : (
                  <div className="p-2 bg-cyan-100 text-gray-900 font-semibold rounded mb-4">
                    AI Response
                  </div>
                )}
              </div>
              <div className="px-8 text-gray-900 font-semibold">
                {m.content}
              </div>
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl">
          <label htmlFor="email" className="sr-only">
            Input
          </label>
          <input
            type="text"
            name="input"
            id="input"
            value={input}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Ask a question..."
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  )
}
