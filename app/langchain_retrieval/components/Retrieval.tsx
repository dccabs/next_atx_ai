'use client'
import { useState } from 'react'
import { useChat } from 'ai/react'

export default function OpenAIChat() {
  const [inputText, setInputText] = useState<string>('')
  const [init, setInit] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [userMessage, setUserMessage] = useState<string>(false)
  const [data, setData] = useState<string>('')

  const handleSubmit = async (e) => {
    setInit(true)
    setLoading(true)
    setUserMessage(inputText)
    e.preventDefault()
    try {
      fetch('/api/langchain_retrieval', {
        method: 'POST',
        body: JSON.stringify({ inputText: inputText }),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
          setInputText('')
        })
    } catch (err) {
      console.log('err', err)
      setLoading(false)
    }
  }

  return (
    <div className="">
      {(loading || data) && (
        <div className="mb-16 w-full">
          <div className="whitespace-pre-wrap">
            <div>
              <div className="p-2 bg-gray-200 text-gray-900 font-semibold rounded mb-4">
                User
              </div>
            </div>
            <div className="px-8 text-gray-900 font-semibold">
              {userMessage}
            </div>
            <div className="p-2 bg-cyan-100 text-gray-900 font-semibold rounded mb-4 mt-4">
              AI Response
            </div>
            <div className="px-8 text-gray-900 font-semibold">
              {loading && !data && (
                <div>Looking for your answer in the database...</div>
              )}
              {!loading && data && <div>{data?.message?.output}</div>}
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Ask a question about your uploaded data
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="input"
              id="input"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Ask a question..."
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              type="button"
              className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit text
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
