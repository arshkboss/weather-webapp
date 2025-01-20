import { GeoLocation, WeatherData } from "@/types/weather"

const WEATHER_URL = "https://api.open-meteo.com/v1"
const GEO_URL = "https://geocoding-api.open-meteo.com/v1"

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${WEATHER_URL}/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max&timezone=auto`,
      { cache: 'no-store' }
    )
    
    if (!response.ok) {
      const error = await response.text()
      console.error('Weather API Error:', error)
      throw new Error('Failed to fetch weather data')
    }

    const data = await response.json()
    
    // Transform Open-Meteo response to match our WeatherData interface
    return {
      current: {
        temp: data.hourly.temperature_2m[0],
        feels_like: data.hourly.apparent_temperature[0],
        humidity: data.hourly.relative_humidity_2m[0],
        weather: [{
          main: getWeatherDescription(data.hourly.weather_code[0]),
          description: getWeatherDescription(data.hourly.weather_code[0]),
          icon: getWeatherIcon(data.hourly.weather_code[0])
        }],
        wind_speed: data.hourly.wind_speed_10m[0]
      },
      hourly: data.hourly.time.map((time: string, i: number) => ({
        dt: new Date(time).getTime() / 1000,
        temp: data.hourly.temperature_2m[i],
        weather: [{
          main: getWeatherDescription(data.hourly.weather_code[i]),
          description: getWeatherDescription(data.hourly.weather_code[i]),
          icon: getWeatherIcon(data.hourly.weather_code[i])
        }]
      })),
      daily: data.daily.time.map((time: string, i: number) => ({
        dt: new Date(time).getTime() / 1000,
        temp: {
          day: data.daily.temperature_2m_max[i],
          min: data.daily.temperature_2m_min[i],
          max: data.daily.temperature_2m_max[i]
        },
        weather: [{
          main: getWeatherDescription(data.daily.weather_code[i]),
          description: getWeatherDescription(data.daily.weather_code[i]),
          icon: getWeatherIcon(data.daily.weather_code[i])
        }]
      }))
    }
  } catch (error) {
    console.error('Weather API Error:', error)
    throw new Error('Failed to fetch weather data')
  }
}

export async function searchLocations(query: string): Promise<GeoLocation[]> {
  if (!query) return []

  try {
    const response = await fetch(
      `${GEO_URL}/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`,
      { cache: 'no-store' }
    )
    
    if (!response.ok) {
      const error = await response.text()
      console.error('Geocoding API Error:', error)
      throw new Error('Failed to fetch locations')
    }

    const data = await response.json()
    
    return data.results.map((item: any) => ({
      name: item.name,
      lat: item.latitude,
      lon: item.longitude,
      country: item.country
    }))
  } catch (error) {
    console.error('Search Location Error:', error)
    throw new Error('Failed to fetch locations')
  }
}

// Helper function to convert WMO weather codes to descriptions
function getWeatherDescription(code: number): string {
  const weatherCodes: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  }
  return weatherCodes[code] || 'Unknown'
}

// Helper function to map weather codes to icon names
function getWeatherIcon(code: number): string {
  if (code === 0) return 'clear'
  if (code === 1 || code === 2) return 'partly-cloudy'
  if (code === 3) return 'cloudy'
  if (code === 45 || code === 48) return 'fog'
  if (code >= 51 && code <= 57) return 'drizzle'
  if (code >= 61 && code <= 67) return 'rain'
  if (code >= 71 && code <= 77) return 'snow'
  if (code >= 80 && code <= 82) return 'rain'
  if (code >= 85 && code <= 86) return 'snow'
  if (code >= 95) return 'thunderstorm'
  return 'unknown'
} 