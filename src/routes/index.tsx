import { createFileRoute } from '@tanstack/react-router'
import { searchUnsplash } from '@/integrations/unsplash/api'
import { ChangeEvent, useState } from 'react'
import { UnsplashImage } from '@/integrations/unsplash/types'
import { useQuery } from '@tanstack/react-query'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

import { Button } from '@/components/ui/button'

import { Search } from 'lucide-react'

export const Route = createFileRoute('/')({
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
        <UnsplashSearcher />
      </section>
    </div>
  )
}

const ImageQuerySearchBar = () => {
  const [input, setInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const { data } = useQuery({
    queryKey: ['remoteImageQuery', searchTerm],
    queryFn: () => searchUnsplash({ data: { query: searchTerm } }),
    enabled: !!searchTerm,
  })
}

const UnsplashSearcher = () => {
  const [photos, setPhotos] = useState<UnsplashImage[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleUnsplashSearch = async () => {
    const data = await searchUnsplash({ data: { query: searchTerm } })
    setPhotos(data)
    console.log(data)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Convert input to lower case for case-insensitive search
    setSearchTerm(e.target.value.toLowerCase())
  }

  return (
    <div>
      <InputGroup className="max-w-xs">
        <InputGroupInput
          placeholder="Search..."
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">{photos.length}</InputGroupAddon>
      </InputGroup>

      <Button onClick={handleUnsplashSearch}>Search!</Button>

      <div className="flex">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id}>
              <img src={photo.urls.thumb} alt={photo.description || ''} />
            </div>
          ))
        ) : (
          <div>
            <p>No images found</p>
          </div>
        )}
      </div>
    </div>
  )
}
