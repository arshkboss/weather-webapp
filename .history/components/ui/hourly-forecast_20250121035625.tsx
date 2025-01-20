"use client"

import { WeatherData } from "@/types/weather"
import { Card } from "./card"
import { Cloud, CloudRain, Sun, Moon } from "lucide-react"
import { ScrollArea, ScrollBar } from "./scroll-area"

interface HourlyForecastProps {
  data: WeatherData
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  const next24Hours = data.hourly.slice(0, 24)

  const getWeatherIcon = (weather: string, hour: number) => {
    const isNight = hour < 6 || hour > 18
    if (weather.toLowerCase().includes('clear')) {
      return isNight ? Moon : Sun
    }
    if (weather.toLowerCase().includes('rain')) return CloudRain
    return Cloud
  }

  const formatHour = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    })
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex space-x-4 pb-4">
        {next24Hours.map((hour) => {
          const date = new Date(hour.dt * 1000)
          const WeatherIcon = getWeatherIcon(hour.weather[0].main, date.getHours())
          
          return (
            <Card key={hour.dt} className="min-w-[100px] bg-black/20 border-0">
              <div className="p-3 text-center space-y-2">
                <p className="text-sm font-medium">{formatHour(hour.dt)}</p>
                <WeatherIcon className="w-8 h-8 mx-auto text-white/80" />
                <p className="text-lg font-bold">{Math.round(hour.temp)}°</p>
              </div>
            </Card>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
} 