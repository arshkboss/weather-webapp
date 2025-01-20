"use client"

import { Card } from "@/components/ui/card"
import { Cloud, CloudRain, Sun } from "lucide-react"

const forecastData = [
  { day: "Monday", icon: Sun, temp: "24°C", condition: "Sunny" },
  { day: "Tuesday", icon: Cloud, temp: "22°C", condition: "Cloudy" },
  { day: "Wednesday", icon: CloudRain, temp: "19°C", condition: "Rain" },
  { day: "Thursday", icon: Sun, temp: "25°C", condition: "Sunny" },
]

export function WeatherForecast() {
  return (
    <>
      {forecastData.map((item) => (
        <Card key={item.day} className="card-effect border-none p-4">
          <div className="flex flex-col items-center gap-2">
            <p className="font-medium">{item.day}</p>
            <item.icon className="h-8 w-8" />
            <p className="text-2xl font-bold">{item.temp}</p>
            <p className="text-sm text-gray-400">{item.condition}</p>
          </div>
        </Card>
      ))}
    </>
  )
} 