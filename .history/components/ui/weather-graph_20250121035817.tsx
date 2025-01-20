"use client"

import { WeatherData } from "@/types/weather"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface WeatherGraphProps {
  data: WeatherData
}

export function WeatherGraph({ data }: WeatherGraphProps) {
  const next24Hours = data.hourly.slice(0, 24).map((hour) => ({
    time: new Date(hour.dt * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    }),
    temp: Math.round(hour.temp)
  }))

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={next24Hours}>
          <XAxis
            dataKey="time"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}°`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg bg-white/10 backdrop-blur-md p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-white/60">Time:</span>
                      <span className="font-medium">{payload[0].payload.time}</span>
                      <span className="text-white/60">Temp:</span>
                      <span className="font-medium">{payload[0].value}°C</span>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 