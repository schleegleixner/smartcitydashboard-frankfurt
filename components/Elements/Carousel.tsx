'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { cva, cx, VariantProps } from 'class-variance-authority'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
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
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align })
  const [curIndex, setCurIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', () => setCurIndex(emblaApi.selectedScrollSnap()))
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
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

      {(arrows || pagination) && (
        <div className="flex w-full items-center justify-between">
          {arrows && (
            <ChevronLeftIcon
              className={arrowStyle({ variant })}
              onClick={scrollPrev}
            />
          )}
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
          {arrows && (
            <ChevronRightIcon
              className={arrowStyle({ variant })}
              onClick={scrollNext}
            />
          )}
        </div>
      )}
    </div>
  )
}
