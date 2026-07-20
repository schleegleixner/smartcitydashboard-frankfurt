'use client'
import React from 'react'
import Link from 'next/link'

type ButtonBaseProps = {
  ariaLabel?: string
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
}

export default function ButtonBase({
  ariaLabel,
  children,
  onClick,
  href,
  className = '',
}: ButtonBaseProps) {
  const base_classes =
    'group flex h-12 cursor-pointer items-center gap-2 rounded-intangible bg-light px-4 font-medium text-primary transition-colors hover:bg-white hover:text-secondary focus-visible:bg-secondary focus-visible:text-white stroke-primary focus-visible:stroke-white hover:stroke-secondary hover:text-secondary'

  const final_classes = `${base_classes} ${className}`

  if (href) {
    return (
      <Link aria-label={ariaLabel} className={final_classes} href={href} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button aria-label={ariaLabel} className={final_classes} onClick={onClick}>
      {children}
    </button>
  )
}
