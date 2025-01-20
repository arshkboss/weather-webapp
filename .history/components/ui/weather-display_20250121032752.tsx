"use client"

import { Cloud, Sun, Thermometer } from "lucide-react"

export function WeatherDisplay() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-4">
        <div className="h-24 w-24 rounded-full card-effect flex items-center justify-center">
          <Sun className="h-12 w-12 text-yellow-500" />
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">London, UK</h2>
          <p className="text-gray-400">Sunny</p>
        </div>
      </div>
      
      <div className="flex gap-6">
        <div className="text-center">
          <div className="flex items-center gap-1">
            <Thermometer className="h-5 w-5" />
            <span className="text-2xl font-bold">24°C</span>
          </div>
          <p className="text-sm text-gray-400">Temperature</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center gap-1">
            <Cloud className="h-5 w-5" />
            <span className="text-2xl font-bold">12%</span>
          </div>
          <p className="text-sm text-gray-400">Humidity</p>
        </div>
      </div>
    </div>
  )
} 