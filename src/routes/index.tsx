import { createFileRoute } from '@tanstack/react-router'
import {
  Zap,
  Server,
  Route as RouteIcon,
  Shield,
  Waves,
  Sparkles,
} from 'lucide-react'
import { searchUnsplash } from '@/integrations/unsplash/api'
import { useState } from 'react'
import { UnsplashImage } from '@/integrations/unsplash/types'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [photos, setPhotos] = useState<UnsplashImage | null>()

  const handleUnsplashSearch = async () => {
    const data = await searchUnsplash()
    setPhotos(data)
    console.log(data)
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
          <span className="text-gray-300">ALCHEMIZE</span>
        </h1>
        <p className="text-gray-400 text-lg mt-4">
          Cricut SVGs at your fingertips
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white"> Search for image </h2>
        <p className="text-gray-400 text-lg mt-4">
          Search for an image and we'll convert it to a Cricut SVG for you
        </p>
        <button
          onClick={handleUnsplashSearch}
          className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
        >
          Click me!
        </button>
      </section>
    </div>
  )
}
