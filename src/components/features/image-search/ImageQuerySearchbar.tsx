import { getRouteApi } from '@tanstack/react-router'
import type { ChangeEvent } from 'react'
import { useState } from 'react'

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

  // const { data } = useInfiniteQuery({
  //   queryKey: ['remoteImagequery', term ?? ''],
  //   queryFn: ({ pageParam }) =>
  //     searchUnsplash({ data: { query: term || '', page: pageParam } }),
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage, pages) =>
  //     pages.length < (lastPage.meta.totalPages || 0)
  //       ? pages.length + 1
  //       : undefined,
  //   enabled: !!term,
  // })

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
          {/* {data?.pages.reduce((total, page) => total + page.photos.length, 0)} */}
        </InputGroupAddon>
      </InputGroup>

      <Button onClick={handleSearch}>Search!</Button>
    </div>
  )
}
