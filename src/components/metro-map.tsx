"use client"

import { useEffect, useRef } from "react"
import { kochiMetroStations } from "@/lib/metro-utils"

interface MetroMapProps {
  highlightOrigin?: string
  highlightDestination?: string
}

export default function MetroMap({ highlightOrigin, highlightDestination }: MetroMapProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw metro line
    const padding = 40
    const stationRadius = 8
    const lineWidth = 6

    const startX = padding
    const endX = rect.width - padding
    const lineY = rect.height / 2
    const stationSpacing = (endX - startX) / (kochiMetroStations.length - 1)

    // Draw the main line
    ctx.beginPath()
    ctx.moveTo(startX, lineY)
    ctx.lineTo(endX, lineY)
    ctx.strokeStyle = "#0284c7" // sky-600
    ctx.lineWidth = lineWidth
    ctx.stroke()

    // Draw stations
    kochiMetroStations.forEach((station, index) => {
      const x = startX + index * stationSpacing

      // Determine if this station should be highlighted
      const isOrigin = station.id === highlightOrigin
      const isDestination = station.id === highlightDestination
      const isHighlighted = isOrigin || isDestination

      // Draw station circle
      ctx.beginPath()
      ctx.arc(x, lineY, stationRadius, 0, Math.PI * 2)

      if (isHighlighted) {
        ctx.fillStyle = isOrigin ? "#0c4a6e" : "#0e7490" // sky-900 for origin, cyan-800 for destination
        ctx.strokeStyle = "#f0f9ff" // sky-50
        ctx.lineWidth = 3
      } else {
        ctx.fillStyle = "#e0f2fe" // sky-100
        ctx.strokeStyle = "#0284c7" // sky-600
        ctx.lineWidth = 2
      }

      ctx.fill()
      ctx.stroke()

      // Draw station name
      ctx.font = isHighlighted ? "bold 10px Arial" : "10px Arial"
      ctx.fillStyle = "#0f172a" // slate-900
      ctx.textAlign = "center"

      // Alternate station names above and below the line
      const textY = index % 2 === 0 ? lineY + 25 : lineY - 20
      ctx.fillText(station.name, x, textY)
    })
  }, [highlightOrigin, highlightDestination])

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-sky-100">
      <h3 className="text-lg font-medium text-sky-800 mb-4 text-center">Kochi Metro Line Map</h3>
      <div className="w-full h-[200px] relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <p className="text-xs text-center text-slate-500 mt-2">
        The Kochi Metro currently operates a single line with 22 stations from Aluva to Petta.
      </p>
    </div>
  )
}

