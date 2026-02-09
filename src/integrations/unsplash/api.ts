import { createApi } from 'unsplash-js'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { env } from '@/env'

const unsplash = createApi({
  accessKey: env.UNSPLASH_ACCESS_KEY,
})

export const searchUnsplash = createServerFn()
  .inputValidator(z.object({ query: z.string().optional() }))
  .handler(async ({ data }) => {
    if (!data.query) {
      return []
    }

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
