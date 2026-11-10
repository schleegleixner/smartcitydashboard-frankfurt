'use client'

import { useEffect, useState } from 'react'
import { ChevronUpIcon as Icon } from '@heroicons/react/24/outline'
import { scrollToTop } from '@/utils/scroll'
import { cx } from 'class-variance-authority'

export default function ToTop() {
  const [is_visible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scroll_top = window.scrollY || document.documentElement.scrollTop
      const doc_height = document.documentElement.scrollHeight
      const win_height = window.innerHeight
      const distance_bottom = doc_height - (scroll_top + win_height)

      setIsVisible(scroll_top > 200 && distance_bottom > -1)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cx(
        'fixed bottom-8 right-8 z-20 cursor-pointer border border-white bg-primary p-3 transition-all hover:bg-secondary',
        { 'opacity-0 pointer-events-none': !is_visible },
      )}
      onClick={scrollToTop}
    >
      <Icon className="h-8 w-8 stroke-white" />
    </div>
  )
}
