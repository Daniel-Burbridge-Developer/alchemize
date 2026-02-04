import { createApi } from 'unsplash-js'
import { createServerFn } from '@tanstack/react-start'
import { env } from '@/env'

const unsplash = createApi({
  accessKey: env.UNSPLASH_ACCESS_KEY,
})

export const searchUnsplash = createServerFn().handler(async () => {
  const result = await unsplash.search.getPhotos({ query: 'cat' })

  if (result.errors) {
    throw new Error(result.errors[0]) // This triggers the catch block in the UI
  } else {
    return { url: result.response.results[0].urls.regular }
  }
})
