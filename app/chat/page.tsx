'use client'

import Input from './components/input'

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto lg:mx-0 space-y-6">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Vercel AI SDK
          </h2>
          <h4 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Chat Example
          </h4>
          <div className="max-w-2xl">
            <div className="prose prose-slate">
              <pre>
                <code className="language-js">
                  {`
module.exports = {
  purge: [],
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
}`}
                </code>
              </pre>
            </div>
            <div>
              <Input />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
