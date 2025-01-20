export interface WeatherData {
  current: {
    temp: number
    feels_like: number
    humidity: number
    weather: {
      main: string
      description: string
      icon: string
    }[]
    wind_speed: number
  }
  hourly: {
    dt: number
    temp: number
    weather: {
      main: string
      description: string
      icon: string
    }[]
  }[]
  daily: {
    dt: number
    sunrise: number
    sunset: number
    temp: {
      day: number
      min: number
      max: number
    }
    weather: {
      main: string
      description: string
      icon: string
    }[]
  }[]
}

export interface GeoLocation {
  name: string
  lat: number
  lon: number
  country: string
} 