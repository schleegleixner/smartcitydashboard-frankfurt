import Spacer from '@/components/Elements/Spacer'
import Divider from '@/components/Elements/Divider'
import Title from '@/components/Elements/Title'
import { cx } from 'class-variance-authority'
import { ForwardRefExoticComponent, JSX, SVGProps } from 'react'
import { BaseTile, EmbedTileProps } from './BaseTile'
import Markdown from '@/components/Elements/Markdown'
import LiveBadge from './LiveBadge'
import { ActionFieldsIconMap } from '@/mapping/ActionFieldsMapping'
import { TextStyle } from '@/utils/variants/TextVariants'
import { TilePayloadType } from '@schleegleixner/react-statamic-api'
import { BackgroundVariant } from '@/utils/variants/BackgroundVariants'
import { getVariantType } from '@/utils/payload'
import DynamicText from '@/components/Elements/DynamicText'
import { TileVariantTypes } from '@/utils/variants/TileVariants'
import { getGlobalString } from '@schleegleixner/react-statamic-api'

export type DataSourceProps = {
  dataRetrieval?: string
}

export type IconTileProps = DataSourceProps &
  EmbedTileProps & {
    variant?: TileVariantTypes
    children?: React.ReactElement<any> | React.ReactElement<any>[]
    title?: string | React.ReactElement<any>
    subtitle?: string | React.ReactElement<any>
    dataSource?: string
    icon?:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
    live?: boolean | null
    tile_payload?: TilePayloadType
  }

function getDownloadUrl(
  datasources: TilePayloadType['datasources'] | undefined,
): string | undefined {
  if (datasources && datasources.length > 0) {
    // check if allow_download is true for any datasource
    const allowed = datasources.find(
      (ds: (typeof datasources)[number]) => ds.allow_download && ds.file_name,
    )
    if (allowed && allowed.file_name) {
      return `/download/${allowed.file_name}`
    }
  }
  return undefined
}

export default function IconTile({
  children,
  live,
  title,
  subtitle,
  icon,
  variant,
  dataRetrieval,
  dataSource,
  embedId,
  tile_payload,
}: IconTileProps) {
  if (!tile_payload) {
    return <></>
  }

  // if live (live-tag) is not set, use tile_payload.live
  live = live ?? tile_payload?.live
  variant = variant ?? getVariantType(tile_payload)

  const Icon =
    icon ||
    ActionFieldsIconMap[
      tile_payload?.tags?.action_field as keyof typeof ActionFieldsIconMap
    ] ||
    (() => <></>)

  return (
    <BaseTile
      dataUrl={getDownloadUrl(tile_payload.datasources ?? [])}
      embedId={embedId}
      footerCenterElement={
        live ? <LiveBadge variant={variant as BackgroundVariant} /> : undefined
      }
      moreInfo={tile_payload?.details}
      sdgTargets={tile_payload?.sdg_targets}
      title={(title as string) ?? (tile_payload?.title as string)}
      variant={variant}
    >
      <div className="mb-4 flex w-full flex-col gap-2">
        <div className="relative flex w-full items-stretch gap-4 overflow-hidden">
          {/* Title */}
          <div className="flex min-w-0 flex-grow items-center justify-start gap-x-4">
            <Title
              as="h2"
              className="mb-0 flex-shrink overflow-hidden"
              margin="none"
            >
              {title ?? (
                <DynamicText tile_payload={tile_payload}>
                  {tile_payload?.title ?? ''}
                </DynamicText>
              )}
            </Title>
          </div>

          {/* Icon */}
          <div className="flex w-12 shrink-0 items-start justify-center lg:w-16">
            <div className="aspect-square w-full overflow-hidden">
              <Icon
                className={cx(
                  'h-full w-full object-contain',
                  TextStyle({ variant }),
                )}
              />
            </div>
          </div>
        </div>
        <Divider size="lg" variant={'light'} />
        <div>
          {(tile_payload?.subtitle || subtitle) && (
            <>
              <Title as={'subtitle'} className="2xl:max-w-[85%]" color={'dark'}>
                {tile_payload?.subtitle ?? subtitle}
              </Title>
            </>
          )}
        </div>
      </div>

      <>{children}</>
      <>{children && <Spacer />}</>

      {tile_payload?.copy && <Markdown content={tile_payload.copy} />}

      <>{tile_payload?.copy && <Spacer />}</>

      <div className="flex flex-col gap-x-8 gap-y-1 text-sm text-primary">
        <div className="">
          <span className="font-bold">{getGlobalString('datenstand')}:</span>{' '}
          {tile_payload?.retrieval ??
            dataRetrieval ??
            (live ? 'live' : new Date().getFullYear())}
        </div>
        <div className="text-sm">
          <span className="font-bold">{getGlobalString('quelle')}:</span>{' '}
          {tile_payload?.source ??
            dataSource ??
            getGlobalString('unbekannte_quelle')}
        </div>
      </div>
    </BaseTile>
  )
}
