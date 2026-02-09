import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'
import { ImageQuerySearchbar } from '@/components/ImageQuerySearchbar'
import { ImageQuerySearchResults } from '@/components/ImageQuerySearchResults'

const imageSearchSchema = z.object({
  term: z.string().optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: zodValidator(imageSearchSchema),
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-5">
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <h1 className="text-6xl font-black [letter-spacing:-0.08em] text-white md:text-7xl">
          <span className="text-gray-300">ALCHEMIZE</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Cricut SVGs at your fingertips
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white"> Search for image </h2>
        <p className="mt-4 text-lg text-gray-400">
          Search for an image and we'll convert it to a Cricut SVG for you
        </p>
        <ImageQuerySearchbar />
        <ImageQuerySearchResults />
      </section>
    </div>
  )
}
