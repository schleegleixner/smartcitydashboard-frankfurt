'use client'

import { HTMLAttributes } from 'react'
import BaseOverlay, { AnimatedStyle } from './BaseOverlay'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'
import { cx, VariantProps } from 'class-variance-authority'
import { SdgImageMap } from '@/mapping/SdgMapping'
import Image from 'next/image'
import Divider from '@/components/Elements/Divider'
import { getGlobalString } from '@schleegleixner/react-statamic-api'
import Button from '@/components/Elements/Button'
import Link from 'next/link'
import {
  SdgTargetType,
  useContentWidth,
} from '@schleegleixner/react-statamic-api'
import Markdown from '@/components/Elements/Markdown'

type SdgInfoOverlayProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
  style?: AnimatedStyle
  sdgTargets: [SdgTargetType]
  onClose?: () => void
}

export default function SdgInfoOverlay({
  sdgTargets,
  onClose,
  ...props
}: SdgInfoOverlayProps) {
  const layout_limit = 420
  const column_limit = 720
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()
  const wide_layout = contentWidth > layout_limit

  return (
    <BaseOverlay onClose={onClose} variant={'inverse'} {...props}>
      <div className="flex flex-col gap-4" ref={elRef}>
        <Text className="uppercase" family="condensed">
          {getGlobalString('nachhaltigkeitsziele_was_ist_das')}
        </Text>

        <Text as="md">
          {getGlobalString('nachhaltigkeitsziele_beschreibung')}
        </Text>

        {sdgTargets.map((sdgTarget, _idx) => (
          <div key={sdgTarget.slug}>
            <Divider />
            <div
              className={cx(
                'flex gap-4 mt-4',
                wide_layout ? 'flex-row items-stretch' : 'flex-col items-start',
              )}
            >
              <div className="flex h-20 aspect-square flex-shrink-0 flex-col">
                <Image
                  alt={`Nachhaltigkeitsziel ${sdgTarget.data.title}`}
                  className="aspect-square h-full w-full object-contain"
                  height={256}
                  src={SdgImageMap[sdgTarget.slug]}
                  width={256}
                />
              </div>

              <div className="flex flex-col justify-between gap-2">
                <Title as={wide_layout ? 'h4' : 'h4'} margin="none">
                  {sdgTarget.data.number} - {sdgTarget.data.title}
                </Title>
                {wide_layout && (
                  <Link
                    className=""
                    href={`/suche?suche=${sdgTarget.data.title}`}
                  >
                    <Button className="inline-block" inverted variant="primary">
                      {getGlobalString('weitere_indikatoren')}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {sdgTarget && typeof sdgTarget.data.copy === 'string' && (
              <div
                className={cx('flex-1 overflow-y-auto overflow-x-hidden pr-4 mt-4')}
              >
                <Text
                  as="md"
                  className={cx(
                    contentWidth > column_limit
                      ? 'column-fill-balance columns-2 gap-12'
                      : '',
                  )}
                >
                  <Markdown content={sdgTarget.data.copy} />
                </Text>
              </div>
            )}

            {!wide_layout && (
              <Link href={`/suche?suche=${sdgTarget.data.title}`}>
                <Button className="inline-block mt-4" inverted variant="primary">
                  {getGlobalString('weitere_indikatoren')}
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </BaseOverlay>
  )
}
