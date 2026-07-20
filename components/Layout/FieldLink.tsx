import { cx } from 'class-variance-authority'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import {
  TileVariantLookup,
  TileVariantTypes,
} from '@/utils/variants/TileVariants'
import { ActionFieldsIconMap } from '@/mapping/ActionFieldsMapping'
import Button from '@/components/Elements/Button'

export type FieldLinkProps = {
  className?: string
  active?: boolean
  label?: string
  page: PageMappingType
  onClick?: () => void
  hideIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function FieldLink({
  className,
  label,
  page,
  active,
  onClick,
  hideIcon,
  size = 'md',
}: FieldLinkProps) {
  const variant = TileVariantLookup[
    page.content.action_field
  ] as TileVariantTypes

  const Icon =
    ActionFieldsIconMap[
      page.content.action_field as keyof typeof ActionFieldsIconMap
    ] || (() => <></>)

  return (
    <Button
      aria-label={`Handlungsfeld ${label ?? page.title} aufrufen`}
      className={cx(className, `max-md:w-full inline-block ${active ? 'active' : ''}`)}
      href={page.full_url}
      Icon={hideIcon ? undefined : Icon}
      onClick={onClick}
      size={size}
      variant={variant}
    >
      {label ?? page.title}
    </Button>
  )
}
