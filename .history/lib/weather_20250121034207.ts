import { GeoLocation, WeatherData } from "@/types/weather"

const API_KEY = "697757ace2e0221b447077c92f6c93e8"
const BASE_URL = "https://api.openweathermap.org/data/3.0"
const GEO_URL = "https://api.openweathermap.org/geo/1.0"

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely,alerts`,
    { cache: 'no-store' }
  )
  
  if (!response.ok) {
    const error = await response.text()
    console.error('Weather API Error:', error)
    throw new Error('Failed to fetch weather data')
  }

  return response.json()
}

export async function searchLocations(query: string): Promise<GeoLocation[]> {
  if (!query) return []

  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`,
      { cache: 'no-store' }
    )
    
    if (!response.ok) {
      const error = await response.text()
      console.error('Geocoding API Error:', error)
      throw new Error('Failed to fetch locations')
    }

    const data = await response.json()
    
    // Transform the response to match our GeoLocation interface
    return data.map((item: any) => ({
      name: item.name,
      lat: item.lat,
      lon: item.lon,
      country: item.country
    }))
  } catch (error) {
    console.error('Search Location Error:', error)
    throw new Error('Failed to fetch locations')
  }
} 