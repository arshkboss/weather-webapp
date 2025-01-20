"use client"

import { WeatherDisplay } from "@/components/ui/weather-display"
import { WeatherForecast } from "@/components/ui/weather-forecast"
import { HourlyForecast } from "@/components/ui/hourly-forecast"
import { WeatherStats } from "@/components/ui/weather-stats"
import { SearchLocation } from "@/components/ui/search-location"
import { WeatherGraph } from "@/components/ui/weather-graph"
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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header and Search */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">WeatherWise</h1>
          <div className="w-72">
            <SearchLocation onLocationSelect={handleLocationSelect} />
          </div>
        </div>

        {error && (
          <div className="text-center text-red-500">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : weatherData && location ? (
          <div className="space-y-6 animate-fade-in">
            {/* Main Weather Display */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Weather */}
              <div className="lg:col-span-2">
                <div className="glass-effect rounded-3xl p-6 relative overflow-hidden">
                  <WeatherDisplay 
                    data={weatherData} 
                    location={`${location.name}, ${location.country}`} 
                  />
                </div>
              </div>
              
              {/* Weather Stats */}
              <div className="glass-effect rounded-3xl p-6">
                <WeatherStats data={weatherData} />
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="glass-effect rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-4">Hourly Forecast</h2>
              <HourlyForecast data={weatherData} />
            </div>

            {/* Weather Graph */}
            <div className="glass-effect rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-4">Temperature Trend</h2>
              <WeatherGraph data={weatherData} />
            </div>

            {/* Daily Forecast */}
            <div className="glass-effect rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-4">2-Week Forecast</h2>
              <WeatherForecast data={weatherData} />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-8">
            Search for a location to see the weather forecast
          </div>
        )}
      </div>
    </main>
  )
}
