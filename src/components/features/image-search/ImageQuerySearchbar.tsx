import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { searchUnsplash } from '@/integrations/unsplash/api'

import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Search } from 'lucide-react'

export const ImageQuerySearchbar = () => {
  const routeApi = getRouteApi('/')
  const navigate = routeApi.useNavigate()
  const { term } = routeApi.useSearch()

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
    <div className="flex gap-4">
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
    </div>
  )
}
