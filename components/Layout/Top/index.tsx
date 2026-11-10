'use client'

import Container from '../Container'
import CityLogo from './GreenCityLogo'
import Link from 'next/link'

export default function Top({ site_id }: { site_id: string }) {
  return (
    <header className="z-100 w-full">
      <Container
        className="flex items-center justify-between gap-8 py-8 md:py-12"
        variant="flat"
      >
        <Link
          className="flex flex-1"
          href={`/${site_id !== 'default' ? site_id : ''}`}
        >
          <div className="flex w-full items-center gap-4">
            <CityLogo />
          </div>
        </Link>
      </Container>
    </header>
  )
}
