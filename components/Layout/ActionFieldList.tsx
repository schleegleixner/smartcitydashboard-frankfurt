'use client'

import { PageMappingType } from '@schleegleixner/react-statamic-api'
import React, { JSX } from 'react'
import FieldLink from '../Layout/FieldLink'

export default function ActionFieldList({
  hideIcon = false,
  onClick,
  sitemap,
  size = 'md',
  exclude = null,
}: {
  hideIcon?: boolean
  onClick?: () => void
  sitemap: PageMappingType[]
  size?: 'sm' | 'md' | 'lg'
  exclude?: string[] | null
}): JSX.Element {
  let field_pages = sitemap.filter((page: any) => page.content.action_field)

  if (exclude) {
    field_pages = field_pages.filter(page => !exclude.includes(page.slug))
  }

  // get active link based on current url
  const current_slug = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : ''

  return (
    <div className="flex flex-wrap gap-4 text-primary">
      {field_pages.map(page => (
        <FieldLink
          active={current_slug === page.slug}
          hideIcon={hideIcon}
          key={page.slug}
          onClick={onClick}
          page={page}
          size={size}
        />
      ))}
    </div>
  )
}
