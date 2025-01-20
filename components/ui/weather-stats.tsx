"use client"

import { WeatherData } from "@/types/weather"
import { Droplets, Sunrise, Sunset, Wind } from "lucide-react"

interface WeatherStatsProps {
  data: WeatherData
}

export function WeatherStats({ data }: WeatherStatsProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Weather Details</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={Wind}
          title="Wind Speed"
          value={`${Math.round(data.current.wind_speed)} m/s`}
        />
        <StatCard
          icon={Droplets}
          title="Humidity"
          value={`${data.current.humidity}%`}
        />
        <StatCard
          icon={Sunrise}
          title="Sunrise"
          value={formatTime(data.daily[0].sunrise)}
        />
        <StatCard
          icon={Sunset}
          title="Sunset"
          value={formatTime(data.daily[0].sunset)}
        />
      </div>
    </div>
  )
}

function StatCard({ 
  icon: Icon, 
  title, 
  value 
}: { 
  icon: any
  title: string
  value: string
}) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-white/60" />
        <p className="text-sm text-white/60">{title}</p>
      </div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  )
} 