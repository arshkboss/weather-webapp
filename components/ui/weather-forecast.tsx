"use client"

import { Card } from "@/components/ui/card"
import { Cloud, CloudRain, Sun } from "lucide-react"
import { WeatherData } from "@/types/weather"

interface WeatherForecastProps {
  data: WeatherData
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  // Get next 24 hours of forecast data
  const hourlyForecast = data.hourly.slice(1, 25)

  const getWeatherIcon = (weather: string) => {
    if (weather.toLowerCase().includes('clear')) return Sun
    if (weather.toLowerCase().includes('rain')) return CloudRain
    return Cloud
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    })
  }

  return (
    <>
      {hourlyForecast.map((hour) => {
        const WeatherIcon = getWeatherIcon(hour.weather[0].main)
        return (
          <Card key={hour.dt} className="card-effect border-none p-4">
            <div className="flex flex-col items-center gap-2">
              <p className="font-medium">{formatTime(hour.dt)}</p>
              <WeatherIcon className="h-8 w-8" />
              <p className="text-2xl font-bold">{Math.round(hour.temp)}°C</p>
              <p className="text-sm text-gray-400">{hour.weather[0].main}</p>
            </div>
          </Card>
        )
      })}
    </>
  )
} 
