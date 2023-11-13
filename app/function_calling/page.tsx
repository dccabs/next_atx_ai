'use client'
import { useState } from 'react'
import Tabs from '@/app/components/ui/Tabs'
import Link from 'next/link'

export default function Page() {
  const [inputText, setInputText] = useState<string>('')
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [init, setInit] = useState<boolean>(false)
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

  const handleSubmit = async (e) => {
    setInit(true)
    setLoading(true)
    e.preventDefault()
    try {
      fetch('/api/function_calling', {
        method: 'POST',
        body: JSON.stringify({ inputText: inputText }),
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

  const activeTab = tabs.find((tab) => tab.current)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
        <div className="max-w-7xl">
          <div className="mx-auto lg:mx-0 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Open AI functions Example
            </h2>
            <div className="space-y-4">
              <p>
                Open AI functions allow you to take a block of text and return
                json data
              </p>
            </div>
          </div>
        </div>
        <Tabs tabs={tabs} />
        {activeTab.id === 'instructions' && (
          <>
            <p>
              Sometimes when working with AI you want to get results returned
              from a LLM that are structured in JSON format.
            </p>
            <p>
              For example maybe you want to parse a document, and store the
              results in a database. Or maybe you want to parse a document and
              then call another function with the results.
            </p>
            <p>
              You can always tell the LLM to return the results in JSON;
              however, the output often is unpredictable and can be difficult to
              parse on the client side. You'll end up needing to use all sorts
              of regex and other methods to try and get valid json.
            </p>
            <p>
              This is where Open AI functions come in. You can use the functions
              method to put in a large amount of text and return your results in
              JSON format.
            </p>
            <p>How it works</p>
            <div className="prose prose-slate max-w-7xl">
              <pre>
                <code className="language-js">
                  {`
// Define your function schema
const game_parser = {
    name: 'game_parser',
    description: 'Get information from an NFL game',
    parameters: {
      type: 'object',
      properties: {
        home_team: {
          type: 'string',
          description: 'What is the city and mascot of the home team?',
        },
        visiting_team: {
          type: 'string',
          description: 'What is the city and mascot of the visiting team?',
        },
        final_score: { type: 'string', description: 'Final score of the game' },
      }
      required: ['game_parser'],
    },
  }
  
  // Call the function in the API.  The content param is the text you will be parsing
  try {
    const apiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: [{ role: 'user', content: inputText }],
      functions: [game_parser],
    })

    return new Response(
      JSON.stringify({ inputText: inputText, apiResponse: apiResponse }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'An error occurred.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
                      `}
                </code>
              </pre>
            </div>
          </>
        )}
        {activeTab.id === 'open-ai-demo' && (
          <div className="space-y-16">
            <p className="text-gray-600">
              To test out the form below. Paste in a recap of an NFL game. The
              open AI function will parse the results into valid JSON that you
              can use to update a DB, call another function, or any task where
              you need structured data
            </p>
            <p>
              You can find some NFL game recaps here.{' '}
              <Link
                className="text-cyan-600 underline cursor-pointer"
                target="_blank"
                href="https://walterfootball.com/nflreview.php"
              >
                Link to recaps
              </Link>
            </p>
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Paste your NFL recap here
              </label>
              <div className="mt-2">
                <textarea
                  rows={16}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={inputText}
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
            <div>
              {loading && <div>Loading...</div>}
              {!loading && init && (
                <div className="prose prose-slate max-w-7xl">
                  <pre>
                    <code className="language-js">
                      {
                        data?.apiResponse?.choices[0]?.message?.function_call
                          ?.arguments
                      }
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
