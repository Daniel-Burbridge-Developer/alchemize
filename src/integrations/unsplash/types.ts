export interface UnsplashImage {
  id: string
  description: string | null
  urls: {
    full: string
    raw: string
    regular: string
    small: string
    thumb: string
  }
}
