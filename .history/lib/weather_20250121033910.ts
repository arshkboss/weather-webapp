import { GeoLocation, WeatherData } from "@/types/weather"

const API_KEY = "697757ace2e0221b447077c92f6c93e8"
const BASE_URL = "https://api.openweathermap.org/data/2.5"
const GEO_URL = "https://api.openweathermap.org/geo/1.0"

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely,alerts`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }

  return response.json()
}

export async function searchLocations(query: string): Promise<GeoLocation[]> {
  const response = await fetch(
    `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch locations')
  }

  return response.json()
} 