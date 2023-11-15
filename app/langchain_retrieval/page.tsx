'use client'
import { useState } from 'react'
import Upload from './components/Upload'
import Retrieval from './components/Retrieval'
import Tabs from '@/app/components/ui/Tabs'
import { HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function Page() {
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
      id: 'upload',
      name: 'Upload to vector DB (Supabase)',
      current: false,
      onClick: () => {
        handleTabSelect('upload')
      },
    },
    {
      id: 'retrieval',
      name: 'Ask a question (Retrieval from Supabase)',
      current: false,
      onClick: () => {
        handleTabSelect('retrieval')
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
              Langchain / Supabase Retrieval Example
            </h2>
            <div className="space-y-4">
              <p>
                In this example we use langchain to split up a large block of
                text into smaller chunks, then upload those chunks to a vector
                database (Supabase). Then we retrieve the information using a
                Langchain retrieval agent.
              </p>
            </div>
          </div>
        </div>
        <Tabs tabs={tabs} />
        {activeTab.id === 'instructions' && (
          <>
            <div className="max-w-7xl">
              <div className="space-y-4">
                <p>Instructions coming soon.</p>
              </div>
            </div>
          </>
        )}
        {activeTab.id === 'upload' && <Upload />}
        {activeTab.id === 'retrieval' && <Retrieval />}
      </div>
    </div>
  )
}
