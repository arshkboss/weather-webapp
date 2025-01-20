"use client"

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SearchLocation() {
  return (
    <div className="relative">
      <div className="glass-effect rounded-lg flex items-center gap-2 p-2">
        <Input
          placeholder="Search for a city..."
          className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button size="icon" variant="ghost" className="shrink-0">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
} 