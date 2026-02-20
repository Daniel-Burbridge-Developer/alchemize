import { searchUnsplash } from '@/integrations/unsplash/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { Spinner } from '@/components/ui/spinner'
import React, { useRef, useEffect } from 'react'

export const ImageQuerySearchResults = () => {
  const routeApi = getRouteApi('/')
  const { term } = routeApi.useSearch()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['remoteImagequery', term ?? ''],
      queryFn: ({ pageParam }) =>
        searchUnsplash({ data: { query: term || '', page: pageParam } }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        pages.length < (lastPage.meta.totalPages || 0)
          ? pages.length + 1
          : undefined,
      enabled: !!term,
    })

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log('Sentinel visible! Fetching next page...')
          fetchNextPage()
        }
      },
      { rootMargin: '100px' },
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (!data) {
    return <p>No Results Found</p>
  }

  return (
    <div className="columns-2 gap-4 md:columns-4 lg:columns-4">
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.photos.map((photo) => (
            <div key={photo.id} className="mb-4 break-inside-avoid">
              <img src={photo.urls.thumb} />
            </div>
          ))}
        </React.Fragment>
      ))}
      <div ref={sentinelRef} className="flex h-10 w-full justify-center">
        {isFetchingNextPage ? <Spinner /> : null}
      </div>
    </div>
  )
}
