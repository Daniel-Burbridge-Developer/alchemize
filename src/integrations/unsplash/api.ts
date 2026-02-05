import { createApi } from 'unsplash-js'
import { createServerFn } from '@tanstack/react-start'
import { env } from '@/env'
import { ReceiptPoundSterling } from 'lucide-react'
import { photos } from 'unsplash-js/dist/internals'
import { R } from 'node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools-ChNsB-ya'

const unsplash = createApi({
  accessKey: env.UNSPLASH_ACCESS_KEY,
})

export const searchUnsplash = createServerFn()
  .inputValidator((data: { query: string }) => data)
  .handler(async ({ data }) => {
    const result = await unsplash.search.getPhotos({ query: data.query })

    if (result.errors) {
      throw new Error(result.errors[0])
    } else {
      const photos = result.response.results.map((photo) => ({
        id: photo.id,
        description: photo.description,
        urls: photo.urls,
      }))

      return photos
    }
  })
