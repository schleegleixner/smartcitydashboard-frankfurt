import Image from 'next/image'
import GreenCityLogo from '@/assets/logos/logo_frankfurt_green_city.jpg'

export default function CityLogo() {
  return (
    <Image
      alt="Logo der Stadt Frankfurt am Main Green City"
      className="pointer-events-none ml-auto h-10 md:h-16 w-auto"
      src={GreenCityLogo}
    />
  )
}
