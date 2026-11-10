import getWeather from '@/lib/brightsky'
import { Weather } from '@/types/brightsky'
import { isEqual } from 'date-fns'
import { useEffect, useState } from 'react'

type stationId = string
type coordinates = { lat: number; lng: number }

const CACHE_KEY = 'weather-cache'

// Load persisted weather data so the tile keeps working while offline.
function loadCache(): Weather[] {
  if (typeof window === 'undefined') {
    return []
  }
  try {
    const raw = window.localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as Weather[]) : []
  } catch {
    return []
  }
}

function persistCache(weather: Weather[]) {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(weather))
  } catch {
    // Storage full or unavailable — nothing we can do, stay silent.
  }
}

export default function useWeather(
  location: stationId | coordinates,
  timestamp: Date,
) {
  const [weatherCache, setWeatherCache] = useState<Weather[]>([])

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    setWeatherCache(loadCache())
  }, [])

  useEffect(() => {
    const match = weatherCache?.find(w =>
      isEqual(new Date(w.timestamp), timestamp),
    )
    if (match) {
      return
    }

    async function getData() {
      let weather: Weather[]
      try {
        const res = await getWeather(location, timestamp)
        weather = res.weather
      } catch {
        // Offline or API unreachable — keep showing the last known (stale) data.
        return
      }

      const weatherMap = new Map<string, Weather>()

      // Concating arrays with duplicates
      const newWeather: Weather[] = [...weatherCache, ...weather]

      // Removing duplicates items
      newWeather.forEach(w => {
        if (!weatherMap.has(w.timestamp)) {
          weatherMap.set(w.timestamp, w)
        }
      })

      const newWeatherCache = Array.from(weatherMap.values()).sort(
        (a, b) =>
          new Date(a.timestamp).getDate() - new Date(b.timestamp).getDate(),
      )

      setWeatherCache(newWeatherCache)
      persistCache(newWeatherCache)
    }

    getData()
  }, [location, timestamp])

  timestamp.setMinutes(0)
  timestamp.setSeconds(0)
  timestamp.setMilliseconds(0)

  const match = weatherCache?.find(w =>
    isEqual(new Date(w.timestamp), timestamp),
  )

  if (match) {
    return match
  }

  // No exact match (e.g. offline and requested hour not cached) — fall back to
  // the most recent cached entry so the tile still renders something.
  if (weatherCache.length > 0) {
    return [...weatherCache].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )[0]
  }
}
