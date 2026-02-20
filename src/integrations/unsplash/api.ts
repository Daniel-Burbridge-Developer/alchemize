import { env } from '@/env'
import { createServerFn } from '@tanstack/react-start'
import { createApi } from 'unsplash-js'
import { z } from 'zod'

interface UnsplashResponse {
  photos: {
    id: string
    description: string | null
    urls: {
      full: string
      raw: string
      regular: string
      small: string
      thumb: string
    }
  }[]
  meta: {
    totalPages: number | null
  }
}

const unsplash = createApi({
  accessKey: env.UNSPLASH_ACCESS_KEY,
})

export const searchUnsplash = createServerFn()
  .inputValidator(
    z.object({ query: z.string().optional(), page: z.int().optional() }),
  )
  .handler(async ({ data }): Promise<UnsplashResponse> => {
    if (!data.query) {
      return { photos: [], meta: { totalPages: null } }
    }

    // check the unsplash API, see how to fetch specific page.
    const result = await unsplash.search.getPhotos({
      query: data.query,
      perPage: 30,
      page: data.page,
    })
    if (result.errors) {
      throw new Error(result.errors[0])
    } else {
      const totalPages = result.response.total_pages
      const photos = result.response.results.map((photo) => ({
        id: photo.id,
        description: photo.description,
        urls: photo.urls,
      }))

      const unsplashResponse: UnsplashResponse = {
        photos: photos,
        meta: { totalPages },
      }

      return unsplashResponse
    }
  })
