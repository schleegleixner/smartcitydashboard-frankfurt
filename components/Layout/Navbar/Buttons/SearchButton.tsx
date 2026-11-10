import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import ButtonBase from './ButtonBase'

export default function SearchButton({ href }: { href: string }) {
  return (
    <ButtonBase ariaLabel="Zur Suchseite" href={href}>
      <MagnifyingGlassIcon className="inline h-8 w-8 xs:h-6 xs:w-6" />
    </ButtonBase>
  )
}
