import React from 'react'
import { HomeIcon } from '@heroicons/react/24/solid'
import ButtonBase from './ButtonBase'

export default function HomeButton({ href }: { href: string }) {
  return (
    <ButtonBase ariaLabel="Zur Startseite" href={href}>
      <HomeIcon className="inline h-8 w-8 xs:h-6 xs:w-6" />
    </ButtonBase>
  )
}
