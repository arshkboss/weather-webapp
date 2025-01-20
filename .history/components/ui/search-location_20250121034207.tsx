"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { searchLocations } from "@/lib/weather"
import { GeoLocation } from "@/types/weather"

interface SearchLocationProps {
  onLocationSelect: (location: GeoLocation) => void
}

export function SearchLocation({ onLocationSelect }: SearchLocationProps) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!query.trim()) return
    
    try {
      setLoading(true)
      setError(null)
      const locations = await searchLocations(query)
      if (locations.length > 0) {
        onLocationSelect(locations[0])
      } else {
        setError('No locations found')
      }
    } catch (error) {
      console.error('Failed to search locations:', error)
      setError('Failed to search locations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative space-y-2">
      <div className="glass-effect rounded-lg flex items-center gap-2 p-2">
        <Input
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={loading}
        />
        <Button 
          size="icon" 
          variant="ghost" 
          className="shrink-0"
          onClick={handleSearch}
          disabled={loading}
        >
          <Search className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  )
} 