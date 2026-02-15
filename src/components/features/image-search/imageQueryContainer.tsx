import { ImageQuerySearchbar } from './ImageQuerySearchbar'
import { ImageQuerySearchResults } from './ImageQuerySearchResults'

export const ImageQueryContainer = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <ImageQuerySearchbar />
      <ImageQuerySearchResults />
    </div>
  )
}
