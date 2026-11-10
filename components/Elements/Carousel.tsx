'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { cva, cx, VariantProps } from 'class-variance-authority'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  TextDefaultVariants,
  TextVariants,
} from '@/utils/variants/TextVariants'

interface CarouselProps extends VariantProps<typeof arrowStyle> {
  children: React.ReactElement<any>[]
  arrows?: boolean
  pagination?: boolean
  loop?: boolean
  align?: 'start' | 'center' | 'end'
  gap?: string
  arrowPosition?: 'bottom' | 'side'
  onSelect?: (index: number) => void
}

const arrowStyle = cva('h-6 cursor-pointer', {
  variants: TextVariants,
  defaultVariants: TextDefaultVariants,
})

export default function Carousel({
  children,
  arrows = false,
  pagination = false,
  loop = false,
  align = 'start',
  variant,
  gap,
  arrowPosition = 'bottom',
  onSelect,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align })
  const [curIndex, setCurIndex] = useState(0)
  const onSelectRef = useRef(onSelect)

  useEffect(() => {
    onSelectRef.current = onSelect
  })

  useEffect(() => {
    if (!emblaApi) return
    const handleSelect = () => {
      const index = emblaApi.selectedScrollSnap()
      setCurIndex(index)
      onSelectRef.current?.(index)
    }
    emblaApi.on('select', handleSelect)
    return () => {
      emblaApi.off('select', handleSelect)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const side_arrows = arrows && arrowPosition === 'side'
  const prevArrow = (
    <ChevronLeftIcon
      className={cx(arrowStyle({ variant }), 'shrink-0')}
      onClick={scrollPrev}
    />
  )
  const nextArrow = (
    <ChevronRightIcon
      className={cx(arrowStyle({ variant }), 'shrink-0')}
      onClick={scrollNext}
    />
  )

  const viewport = (
    <div
      className={cx('overflow-hidden', side_arrows && 'min-w-0 flex-1')}
      ref={emblaRef}
    >
      <div className="flex" style={{ gap }}>
        {children?.map(child => (
          <div
            className="min-w-0 flex-[0_0_100%]"
            key={child.key}
            style={gap ? { flex: `0 0 calc(100% - ${gap})` } : undefined}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )

  if (side_arrows) {
    return (
      <div className="flex items-center gap-2">
        {prevArrow}
        {viewport}
        {nextArrow}
      </div>
    )
  }

  return (
    <div className="relative">
      {viewport}

      {(arrows || pagination) && (
        <div className="flex w-full items-center justify-between">
          {arrows && prevArrow}
          {pagination && (
            <div className="flex gap-1">
              {children.map((_, i) => (
                <div
                  key={i}
                  className={cx(
                    'h-3 w-3 rounded-full border-2 border-primary transition-colors',
                    curIndex === i ? 'bg-primary' : 'bg-transparent',
                  )}
                  onClick={() => emblaApi?.scrollTo(i)}
                />
              ))}
            </div>
          )}
          {arrows && nextArrow}
        </div>
      )}
    </div>
  )
}
