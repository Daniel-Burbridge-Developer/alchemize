import { searchUnsplash } from '@/integrations/unsplash/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import React, { useRef } from 'react'

// export const ImageQuerySearchResults = () => {
//   const routeApi = getRouteApi('/')
//   const { term } = routeApi.useSearch()

//   const { data } = useQuery({
//     queryKey: ['remoteImageQuery', term ?? ''],
//     queryFn: () => searchUnsplash({ data: { query: term || '' } }),
//     enabled: !!term,
//   })

//   if (!data) {
//     return <p>No Results Found</p>
//   }

//   return (
//     <div className="colums-2 gap-4 md:columns-4 lg:columns-4">
//       {data.photos.map((photo) => (
//         <div key={photo.id} className="mb-4 break-inside-avoid">
//           <img src={photo.urls.thumb} />
//         </div>
//       ))}
//     </div>
//   )
// }

export const ImageQuerySearchResults = () => {
  const routeApi = getRouteApi('/')
  const intersectionRef = useRef(0)
  const { term } = routeApi.useSearch()

  const { data } = useInfiniteQuery({
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

  if (!data) {
    return <p>No Results Found</p>
  }

  return (
    <div className="colums-2 gap-4 md:columns-4 lg:columns-4">
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.photos.map((photo) => (
            <div key={photo.id} className="mb-4 break-inside-avoid">
              <img src={photo.urls.thumb} />
            </div>
          ))}

          <div ref={intersectionRef}></div>
        </React.Fragment>
      ))}
    </div>
  )
}
