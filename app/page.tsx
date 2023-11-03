'use client'

import Input from './components/input'

export default function Example() {
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto lg:mx-0 space-y-6'>
          <h2 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Next.js ATX Meetup
          </h2>
          <h4 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
            Vercel AI SDK
          </h4>
          <div className='max-w-2xl'>
            <ul className='list-decimal space-y-4 text-xl font-semibold ml-8'>
              <li>What is the Vercel AI SDK?</li>
              <li>Streaming Data - Why do this? How do we do it?</li>
              <li>Open AI Function Calling - Turning unstructured data into structured data</li>
              <li>Langchain - What is langchain? How can we use lanchain in the vercel AI SDK?</li>
              <li>Vector DB's - What is the purpose of a vector DB? How can we use one in Next.js (supabase)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
