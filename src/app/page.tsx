import Image from "next/image"
import MetroCalculator from "@/components/metro-calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="relative w-full max-w-md h-16 mb-4">
            <Image src="/kochi-metro-logo.png" alt="Kochi Metro Logo" fill className="object-contain" priority />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-sky-800 mb-2">Kochi Metro Time Calculator</h1>
          <p className="text-slate-600 max-w-2xl">
            Quickly calculate travel time between any two Kochi Metro stations to plan your journey efficiently.
          </p>
        </div>

        <MetroCalculator />

        <footer className="mt-16 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Kochi Metro Time Calculator</p>
          <p className="mt-1">A helpful tool for commuters, tourists, and locals</p>
        </footer>
      </div>
    </main>
  )
}

