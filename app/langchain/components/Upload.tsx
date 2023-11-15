'use client'
import { useState } from 'react'
import { useChat } from 'ai/react'

export default function OpenAIChat() {
  const [inputText, setInputText] = useState<string>('')
  const [init, setInit] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>({})

  const handleSubmit = async (e) => {
    setInit(true)
    setLoading(true)
    e.preventDefault()
    try {
      fetch('/api/langchain_retrieval', {
        method: 'POST',
        body: JSON.stringify({ inputText: inputText })
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    } catch (err) {
      console.log('err', err)
      setLoading(false)
    }
  }

  return (
    <div className=''>
      <div>
        <label
          htmlFor='comment'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Paste your NFL recap here
        </label>
        <div className='mt-2'>
          <textarea
            rows={16}
            name='comment'
            id='comment'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className='mt-4'>
          <button
            onClick={handleSubmit}
            type='button'
            className='rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Submit text
          </button>
        </div>
      </div>
    </div>
  )
}
