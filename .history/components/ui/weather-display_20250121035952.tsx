"use client"

import * as React from "react"
import { WeatherData } from "@/types/weather"
import { Cloud, CloudRain, Sun, Moon } from "lucide-react"

interface WeatherDisplayProps {
  data: WeatherData
  location: string
}

export function WeatherDisplay({ data, location }: WeatherDisplayProps) {
  const current = data.current
  const weatherIcon = current.weather[0].main.toLowerCase()
  const isNight = new Date().getHours() < 6 || new Date().getHours() > 18

  const getWeatherIcon = () => {
    if (weatherIcon.includes('clear')) {
      return isNight ? Moon : Sun
    }
    if (weatherIcon.includes('rain')) return CloudRain
    return Cloud
  }

  const WeatherIcon = getWeatherIcon()

  return (
    <div className="relative">
      {/* Background Weather Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl" />
        {weatherIcon.includes('rain') && (
          <div className="rain-animation absolute inset-0" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{location}</h2>
            <p className="text-white/80">{current.weather[0].description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <WeatherIcon className="h-16 w-16 text-white" />
            <div className="text-right">
              <div className="text-5xl font-bold">{Math.round(current.temp)}°</div>
              <p className="text-white/80">Feels like {Math.round(current.feels_like)}°</p>
            </div>
          </div>
        </div>

        {/* Daily High/Low */}
        <div className="mt-6 flex gap-4">
          <div>
            <p className="text-white/60 text-sm">High</p>
            <p className="text-xl font-semibold">{Math.round(data.daily[0].temp.max)}°</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">Low</p>
            <p className="text-xl font-semibold">{Math.round(data.daily[0].temp.min)}°</p>
          </div>
        </div>
      </div>
    </div>
  )
} 