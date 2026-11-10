// import MoreDetails from '@/components/Elements/MoreDetails'
import { cva, VariantProps } from 'class-variance-authority'
import Divider from '@/components/Elements/Divider'
import { SdgImageMap } from '@/mapping/SdgMapping'
import Image from 'next/image'
import { SdgTargetType } from '@schleegleixner/react-statamic-api'
import { cx } from 'class-variance-authority'
import { MsKlimadashboardIconsNaviInfoI } from '@/components/Icons/Navigation'

const tileFooterStyle = cva('flex flex-1 gap-4', {
  variants: {
    variant: {
      primary: 'text-primary fill-primary',
      inverse: 'text-white fill-white',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type TileFooterProps = VariantProps<typeof tileFooterStyle> & {
  label: string
  onMoreInfoClick: () => void
  sdgTargets: SdgTargetType[]
}

/**
 * A footer for all tiles with sharing, export and embed button as well as a more information link
 * @returns TileFooter
 */
export default function SdgInfoFooter({
  label,
  onMoreInfoClick,
  sdgTargets,
}: TileFooterProps) {
  let width_class = ''
  switch (sdgTargets.length) {
    case 5:
      width_class = 'w-[20%]'
      break
    case 6:
      width_class = 'w-[16.6667%]'
      break
    case 7:
      width_class = 'w-[14.2857%]'
      break
    case 8:
      width_class = 'w-[12.5%]'
      break
    default:
      width_class = 'w-[25%]'
  }

  return (
    <div>
      <Divider />
      <div className="flex flex-col justify-start gap-4">
        <div className="flex flex-1 flex-row items-center justify-between gap-2">
          <div className="flex cursor-pointer items-center gap-1 font-condensed uppercase hover:text-secondary transition-all" onClick={onMoreInfoClick}>
            <div>
              <MsKlimadashboardIconsNaviInfoI className="h-4" />
            </div>
            <div>
              {sdgTargets.length > 1
              ? 'Nachhaltigkeitsziele'
              : 'Nachhaltigkeitsziel'}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          {sdgTargets.map((sdgTarget, _idx) => (
            <div
              className={cx(width_class, 'item-start aspect-square max-w-32 cursor-pointer overflow-hidden group')}
              key={sdgTarget.slug}
              onClick={onMoreInfoClick}
            >
              <Image
                alt={`Nachhaltigkeitsziel ${sdgTarget.data.title}`}
                className="aspect-square h-full w-full object-contain group-hover:scale-105 transition-all"
                height={256}
                src={SdgImageMap[sdgTarget.slug]}
                width={256}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
