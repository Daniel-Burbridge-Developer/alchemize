import { getRouteApi } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { searchUnsplash } from '@/integrations/unsplash/api'

export const ImageQuerySearchResults = () => {
  const routeApi = getRouteApi('/')
  const { term } = routeApi.useSearch()

  const { data } = useQuery({
    queryKey: ['remoteImageQuery', term ?? ''],
    queryFn: () => searchUnsplash({ data: { query: term || '' } }),
    enabled: !!term,
  })

  if (!data) {
    return <p>No Results Found</p>
  }

  return (
    <div className="colums-2 gap-4 md:columns-4 lg:columns-4">
      {data.map((photo) => (
        <div key={photo.id} className="mb-4 break-inside-avoid">
          <img src={photo.urls.thumb} />
        </div>
      ))}
    </div>
  )
}
