import { MouseEvent } from 'react'
import { cx } from 'class-variance-authority'
import Link from 'next/link'
import { trackEvent } from 'fathom-client'
import Text from '@/components/Elements/Text'
import { LinkProps } from './LinkComponent'

export default function BarLink({
  ariaLabel,
  title,
  link,
  icon,
  onClick,
  LinkClass,
  preventDefault,
}: LinkProps) {
  const Icon = icon

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(`Link clicked: ${title || link}`)

    if (onClick) {
      onClick()

      if (preventDefault) {
        event.preventDefault()
      }
    }
  }

  return (
    <Link
      aria-label={ariaLabel || title || link}
      className={cx(
        LinkClass,
        'flex flex-row items-center gap-4 border-l border-light px-8 text-white transition-all hover:bg-white hover:text-secondary focus-visible:bg-secondary focus-visible:text-white [&.active]:bg-white [&.active]:text-secondary [&.active]:hover:bg-white',
      )}
      href={link}
      onClick={handleClick}
    >
      {Icon && (
        <div className="h-4 w-4">
          <Icon className="h-full w-full object-contain" />
        </div>
      )}
      <Text className="whitespace-nowrap uppercase" family="condensed">
        {title}
      </Text>
    </Link>
  )
}
