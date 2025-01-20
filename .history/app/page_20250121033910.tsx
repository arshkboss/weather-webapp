"use client"

import { WeatherDisplay } from "@/components/ui/weather-display"
import { WeatherForecast } from "@/components/ui/weather-forecast"
import { SearchLocation } from "@/components/ui/search-location"
import { useState, useEffect } from "react"
import { WeatherData, GeoLocation } from "@/types/weather"
import { getWeatherData } from "@/lib/weather"

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLocationSelect = async (newLocation: GeoLocation) => {
    setLocation(newLocation)
    try {
      setLoading(true)
      setError(null)
      const data = await getWeatherData(newLocation.lat, newLocation.lon)
      setWeatherData(data)
    } catch (err) {
      setError('Failed to fetch weather data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Weather Forecast</h1>
          <p className="text-lg text-gray-400">Check the weather anywhere in the world</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <SearchLocation onLocationSelect={handleLocationSelect} />
        </div>

        {error && (
          <div className="text-center text-red-500">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : weatherData && location ? (
          <>
            <div className="glass-effect rounded-xl p-6">
              <WeatherDisplay 
                data={weatherData} 
                location={`${location.name}, ${location.country}`} 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <WeatherForecast data={weatherData} />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400 mt-8">
            Search for a location to see the weather forecast
          </div>
        )}
      </div>
    </main>
  )
}
