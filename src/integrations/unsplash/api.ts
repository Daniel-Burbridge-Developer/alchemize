import { createApi } from 'unsplash-js'
import { createServerFn } from '@tanstack/react-start'
import { env } from '@/env'

export const searchUnsplash = createServerFn().handler(async () => {
  const unsplash = createApi({
    accessKey: env.UNSPLASH_ACCESS_KEY,
  })
  unsplash.search.getPhotos({ query: 'cat' }).then((result) => {
    if (result.errors) {
      // handle error here
      console.log('error occurred: ', result.errors[0])
    } else {
      // handle success here
      const photo = result.response
      console.log(photo)
    }
  })
})
