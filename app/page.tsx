'use client'

import Link from 'next/link'

const Links = [
  { href: '/chat', label: 'Basic Chat Example' },
  { href: '/function_calling', label: 'Open AI Functions Example' },
  { href: '/langchain', label: 'Langchain Chat Examples' },
  {
    href: '/langchain_retrieval',
    label: 'Langchain / Supabase Retrieval Vector DB',
  },
  { href: '/langchain_serp', label: 'Serp (Search Engine API) Example' },
]

const ResourceLinks = [
  { href: 'https://sdk.vercel.ai/', label: 'Vercel AI SDK Playground' },
  {
    href: 'https://js.langchain.com/docs/get_started/installation',
    label: 'Langchain Node JS',
  },
  {
    href: 'https://supabase.com/docs/guides/ai',
    label: 'Supabase Vector DB and Docs',
  },
  { href: 'https://replicate.com/explore', label: 'Replicate' },
]

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto lg:mx-0 space-y-6">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Next.js ATX Meetup - Nov 15, 2023
            </h2>
            <h4 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Vercel AI SDK
            </h4>
            <div className="space-y-4">
              <p>
                First add the following dependencies to try out the examples
                below:
              </p>
              <div className="max-w-2xl">
                <div className="prose prose-slate">
                  <pre>
                    <code className="language-js">
                      {`yarn add ai
yarn add openai`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p>
                If you want to use Open AI, or Replicate, you'll need to get an
                API key from{' '}
                <Link
                  target="_blank"
                  className="underline text-cyan-600"
                  href="https://openai.com/"
                >
                  https://openai.com/
                </Link>
                :
              </p>
              <div className="max-w-2xl">
                <div className="prose prose-slate">
                  <pre>
                    <code className="language-js">
                      {`Add to your .env file:
                    
OPENAI_API_KEY=sk-*******`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
            <div className="max-w-2xl space-y-4">
              <h4 className="font-bold text-3xl">Examples:</h4>
              <ul className="list-decimal space-y-4 text-xl font-semibold ml-8">
                {Links.map(({ href, label }) => (
                  <li key={`${href}${label}`}>
                    <Link
                      className="text-cyan-600 hover:text-cyan:800 hover:underline"
                      href={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="max-w-2xl space-y-4">
              <h4 className="font-bold text-3xl">Resources:</h4>
              <ul className="list-decimal space-y-4 text-xl font-semibold ml-8">
                {ResourceLinks.map(({ href, label }) => (
                  <li key={`${href}${label}`}>
                    <Link
                      target="_blank"
                      className="text-cyan-600 hover:text-cyan:800 hover:underline"
                      href={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
