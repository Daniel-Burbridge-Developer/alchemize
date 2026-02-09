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
    <div>
      {data.map((photo) => (
        <div key={photo.id}>
          <img src={photo.urls.thumb} />
        </div>
      ))}
    </div>
  )
}
