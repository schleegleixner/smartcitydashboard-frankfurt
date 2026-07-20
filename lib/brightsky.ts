import {
  IconWeatherGewitter,
  IconWeatherHagel,
  IconWeatherNeblig,
  IconWeatherRegnerisch,
  IconWeatherSchnee,
  IconWeatherSchneeregen,
  IconWeatherSonnig,
} from '@/components/Icons/Weather'
import { BrightSkyResponse, Condition } from '@/types/brightsky'
import { SVGProps } from 'react'

export type dwd_station_id = string
export type coordinates = { lat: number; lng: number }

const BRIGHTSKY_BASEURL = 'https://api.brightsky.dev/weather'

const getWeather = async (
  location: dwd_station_id | coordinates,
  date = new Date(),
) => {
  let locationQuery: { dwd_station_id: string } | { lat: string; lon: string }
  if (typeof location === 'string' || location instanceof String) {
    locationQuery = {
      // @ts-ignore
      dwd_station_id: location,
    }
  } else {
    locationQuery = {
      lat: location.lat.toString(),
      lon: location.lng.toString(),
    }
  }

  const query = new URLSearchParams({
    ...locationQuery,
    date: date.toISOString(),
  })

  // Bail out before hitting the network while offline, otherwise fetch throws
  // an opaque "Failed to fetch" TypeError that pops up in the dev overlay.
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new Error('BrightSky request skipped: offline')
  }

  let res: Response
  try {
    res = await fetch(`${BRIGHTSKY_BASEURL}?${query.toString()}`)
  } catch (error) {
    throw new Error('BrightSky request failed: network unreachable', {
      cause: error,
    })
  }
  if (!res.ok) {
    throw new Error(`BrightSky request failed with status ${res.status}`)
  }
  return (await res.json()) as Promise<BrightSkyResponse>
}
export default getWeather

type ConditionMapping = {
  [_key in Condition]: string
}

type ConditionMappingIcon = {
  [_key in Condition]: (_props: SVGProps<SVGSVGElement>) => React.JSX.Element
}

export const conditionMapping: ConditionMapping = {
  dry: 'trocken',
  fog: 'nebelig',
  hail: 'am hageln',
  rain: 'regnerisch',
  sleet: 'am Schneeregnen',
  snow: 'am schneien',
  thunderstorm: 'am Gewittern',
}

export const conditionMappingIcon: ConditionMappingIcon = {
  dry: IconWeatherSonnig,
  fog: IconWeatherNeblig,
  hail: IconWeatherHagel,
  rain: IconWeatherRegnerisch,
  sleet: IconWeatherSchneeregen,
  snow: IconWeatherSchnee,
  thunderstorm: IconWeatherGewitter,
}
