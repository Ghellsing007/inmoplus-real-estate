"use client"

import { useEffect, useRef } from "react"

interface MapWithMarkersProps {
  locations: {
    lat: number
    lng: number
    id: string
  }[]
  height?: string
  zoom?: number
}

export default function MapWithMarkers({ locations, height = "400px", zoom = 15 }: MapWithMarkersProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // For now, we'll show a placeholder map
    // In a real implementation, you would integrate with:
    // - Google Maps API
    // - Mapbox
    // - Leaflet.js
    // - OpenStreetMap

    if (mapRef.current) {
      // Simulate map loading
      console.log("Loading map with locations:", locations)
    }
  }, [locations])

  return (
    <div
      ref={mapRef}
      className="w-full bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden"
      style={{ height }}
    >
      {/* Placeholder Map */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            {/* Simulated streets */}
            <path d="M0,150 L400,150" stroke="#666" strokeWidth="2" />
            <path d="M200,0 L200,300" stroke="#666" strokeWidth="2" />
            <path d="M0,100 L400,100" stroke="#999" strokeWidth="1" />
            <path d="M0,200 L400,200" stroke="#999" strokeWidth="1" />
            <path d="M100,0 L100,300" stroke="#999" strokeWidth="1" />
            <path d="M300,0 L300,300" stroke="#999" strokeWidth="1" />

            {/* Simulated buildings */}
            <rect x="50" y="50" width="40" height="40" fill="#ddd" />
            <rect x="120" y="80" width="30" height="30" fill="#ddd" />
            <rect x="250" y="60" width="50" height="35" fill="#ddd" />
            <rect x="320" y="180" width="35" height="45" fill="#ddd" />
            <rect x="80" y="220" width="45" height="30" fill="#ddd" />
          </svg>
        </div>

        {/* Property Markers */}
        {locations.map((location, index) => (
          <div
            key={location.id}
            className="absolute transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${50 + index * 20}%`,
              top: `${40 + index * 10}%`,
            }}
          >
            <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <p className="text-gray-600 font-medium">Mapa Interactivo</p>
          <p className="text-sm text-gray-500">
            {locations.length} ubicación{locations.length !== 1 ? "es" : ""} marcada{locations.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  )
}
