import { IconStyle } from '@/utils/variants/IconVariants'
import { TileVariantTypes } from '@/utils/variants/TileVariants'
import { cx } from 'class-variance-authority'
import Placeholder from '@/components/Icons/Placeholder'
import ReactIcons from '@schleegleixner/react-adobe-icons-package'
import iconMap from '@/mapping/IconMapping'

interface IconFactoryProps {
  type: string | null | undefined
  className?: string
  variant?: TileVariantTypes
  style?: React.CSSProperties
}

/**
 * The IconFactory is a helper function to create Icons dynamically.
 *
 * @param param IconFactoryProps
 * @returns Icon
 */
export default function IconFactory({
  className = '',
  variant = 'primary',
  style = {},
  type,
}: IconFactoryProps) {
  // extend iconMap with icons from @schleegleixner/react-adobe-icons-package
  Object.assign(iconMap, ReactIcons)
  
  if (!type || !iconMap[type]) {
    return <Placeholder />
  }

  const Icon = iconMap[type]
  return (
    <Icon className={cx(IconStyle({ variant }), className)} style={style} />
  )
}
