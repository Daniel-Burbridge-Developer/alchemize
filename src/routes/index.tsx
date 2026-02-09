import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { zodValidator } from '@tanstack/zod-adapter'
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { z } from 'zod'
import { Search } from 'lucide-react'

import { searchUnsplash } from '@/integrations/unsplash/api'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'

const imageSearchSchema = z.object({
  term: z.string().optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: zodValidator(imageSearchSchema),
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-5">
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <h1 className="text-6xl font-black [letter-spacing:-0.08em] text-white md:text-7xl">
          <span className="text-gray-300">ALCHEMIZE</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Cricut SVGs at your fingertips
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white"> Search for image </h2>
        <p className="mt-4 text-lg text-gray-400">
          Search for an image and we'll convert it to a Cricut SVG for you
        </p>
        <ImageQuerySearch />
      </section>
    </div>
  )
}

const ImageQuerySearch = () => {
  const { term } = Route.useSearch()
  const navigate = Route.useNavigate()

  const [input, setInput] = useState(term || '')

  const { data } = useQuery({
    queryKey: ['remoteImageQuery', term ?? ''],
    queryFn: () => searchUnsplash({ data: { query: term || '' } }),
    enabled: !!term,
  })

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSearch = () => {
    navigate({ search: { term: input } })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <InputGroup className="max-w-xs">
        <InputGroupInput
          placeholder="Search..."
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          value={input}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {data?.length || 0}
        </InputGroupAddon>
      </InputGroup>

      <Button onClick={handleSearch}>Search!</Button>

      <ImageQuerySearchResults />
    </div>
  )
}

const ImageQuerySearchResults = () => {
  const { term } = Route.useSearch()

  const { data } = useQuery({
    queryKey: ['remoteImageQuery', term ?? ''],
    queryFn: () => searchUnsplash({ data: { query: term || '' } }),
    enabled: !!term,
  })

  if (!data) {
    return <p>No Results Found</p>
  }

  return (
    <div>
      {data.map((photo) => (
        <div key={photo.id}>
          <img src={photo.urls.thumb} />
        </div>
      ))}
    </div>
  )
}
