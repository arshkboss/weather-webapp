"use client"

import { Cloud, Sun, Thermometer, Wind } from "lucide-react"
import { WeatherData } from "@/types/weather"

interface WeatherDisplayProps {
  data: WeatherData
  location: string
}

export function WeatherDisplay({ data, location }: WeatherDisplayProps) {
  const current = data.current
  const weatherIcon = current.weather[0].main.toLowerCase()
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-4">
        <div className="h-24 w-24 rounded-full card-effect flex items-center justify-center">
          {weatherIcon.includes('clear') ? (
            <Sun className="h-12 w-12 text-yellow-500" />
          ) : (
            <Cloud className="h-12 w-12 text-blue-400" />
          )}
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">{location}</h2>
          <p className="text-gray-400">{current.weather[0].description}</p>
        </div>
      </div>
      
      <div className="flex gap-6">
        <div className="text-center">
          <div className="flex items-center gap-1">
            <Thermometer className="h-5 w-5" />
            <span className="text-2xl font-bold">{Math.round(current.temp)}°C</span>
          </div>
          <p className="text-sm text-gray-400">Feels like {Math.round(current.feels_like)}°C</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center gap-1">
            <Wind className="h-5 w-5" />
            <span className="text-2xl font-bold">{Math.round(current.wind_speed)} m/s</span>
          </div>
          <p className="text-sm text-gray-400">Wind Speed</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center gap-1">
            <Cloud className="h-5 w-5" />
            <span className="text-2xl font-bold">{current.humidity}%</span>
          </div>
          <p className="text-sm text-gray-400">Humidity</p>
        </div>
      </div>
    </div>
  )
} 