import { XMarkIcon } from '@heroicons/react/24/outline'
import { HTMLAttributes } from 'react'
import { animated } from '@react-spring/web'
import { cva, VariantProps } from 'class-variance-authority'
import {
  BackgroundDefaultVariants,
  BackgroundVariants,
} from '@/utils/variants/BackgroundVariants'
import {
  TextDefaultVariants,
  TextVariants,
} from '@/utils/variants/TextVariants'
import MoreDetails from '@/components/Elements/MoreDetails'

export const overlayStyle = cva(
  'absolute left-0 top-0 z-20 h-full w-full bg-opacity-90 backdrop-blur p-8 md:pb-4 md:p-12 flex flex-col-reverse md:flex-row',
  {
    variants: BackgroundVariants,
    defaultVariants: BackgroundDefaultVariants,
  },
)

export type AnimatedStyle = Record<string, unknown>

const iconStyle = cva(
  'h-12 cursor-pointer self-end transition-all hover:text-secondary md:self-auto',
  {
    variants: TextVariants,
    defaultVariants: TextDefaultVariants,
  },
)

type BaseOverlayProps = VariantProps<typeof overlayStyle> &
  Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
    style?: AnimatedStyle
    children: React.ReactNode | React.ReactNode[]
    onClose?: () => void
  }

export default function BaseOverlay({
  variant,
  children,
  onClose,
  ...props
}: BaseOverlayProps) {
  const AnimatedDiv = animated.div as React.ComponentType<
    Omit<HTMLAttributes<HTMLDivElement>, 'style'> & { style?: AnimatedStyle }
  >

  return (
    <AnimatedDiv {...props} className={overlayStyle({ variant })}>
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden pr-4">
        {children}
        <div className="mt-8 flex w-full justify-center">
          <MoreDetails
            lessDetails={true}
            onClick={onClose}
            variant={variant === 'inverse' ? 'primary' : 'inverse'}
          />
        </div>
      </div>
      <XMarkIcon
        className={iconStyle({
          variant: variant === 'inverse' ? 'dark' : 'white',
        })}
        onClick={onClose}
      />
    </AnimatedDiv>
  )
}
