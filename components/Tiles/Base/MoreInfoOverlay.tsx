'use client'

import React, { HTMLAttributes } from 'react'
import BaseOverlay, { AnimatedStyle, overlayStyle } from './BaseOverlay'
import Text from '@/components/Elements/Text'
import { cx, VariantProps } from 'class-variance-authority'
import Divider from '@/components/Elements/Divider'
import Title from '@/components/Elements/Title'
import { replaceContentTags } from '@schleegleixner/react-statamic-api'
import { useContentWidth } from '@schleegleixner/react-statamic-api'

type MoreInfoOverlayProps = VariantProps<typeof overlayStyle> &
  Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
    style?: AnimatedStyle
    onClose?: () => void
    children?: React.ReactNode | React.ReactNode[]
    title?: string
  }

export default function MoreInfoOverlay({
  onClose,
  children,
  title,
  ...props
}: MoreInfoOverlayProps) {
  const limit = 720
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()

  return (
    <BaseOverlay onClose={onClose} variant={'inverse'} {...props}>
      <div className="flex flex-col gap-4">
        {title && (
          <Title as="h3" margin="none">
            {replaceContentTags(title)}
          </Title>
        )}
        {title && <Divider />}

        <div
          className={cx(
            'flex-1 overflow-y-auto overflow-x-hidden pr-4'
          )}
          ref={elRef}
        >
          <Text as="md" className={cx(contentWidth > limit ? 'column-fill-balance columns-2 gap-12' : '')}>{children}</Text>
        </div>
      </div>
    </BaseOverlay>
  )
}
