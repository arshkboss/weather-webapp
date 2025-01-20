import { Card } from "@/components/ui/card"
import { WeatherDisplay } from "@/components/weather-display"
import { WeatherForecast } from "@/components/weather-forecast"
import { SearchLocation } from "@/components/search-location"

export default function Home() {
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
          <SearchLocation />
        </div>

        {/* Current Weather */}
        <div className="glass-effect rounded-xl p-6">
          <WeatherDisplay />
        </div>

        {/* Forecast */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <WeatherForecast />
        </div>
      </div>
    </main>
  )
}
