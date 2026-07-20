'use client'

import { cva, cx, VariantProps } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import { useTransition } from '@react-spring/web'
import EmbedOverlay from './EmbedOverlay'
import ShareOverlay from './ShareOverlay'
import MoreInfoOverlay from './MoreInfoOverlay'
import SdgInfoOverlay from './SdgInfoOverlay'
import TileFooter from './TileFooter'
import SdgInfoFooter from './SdgInfoFooter'
import { SdgTargetType, TileType } from '@schleegleixner/react-statamic-api'
import {
  BorderDefaultVariants,
  BorderVariantsBottom,
} from '@/utils/variants/BorderVariants'
import Markdown from '@/components/Elements/Markdown'
import { scrollToElement } from '@/utils/scroll'

const baseTileStyle = cva(
  'relative flex flex-col md:flex-row h-fit overflow-hidden bg-white border-b-8 rounded-intangible',
  {
    variants: BorderVariantsBottom,
    defaultVariants: BorderDefaultVariants,
  },
)

export type EmbedTileProps = { embedId?: TileType }

export type BaseTileProps = VariantProps<typeof baseTileStyle> &
  EmbedTileProps & {
    children: React.ReactElement<any> | React.ReactElement<any>[]
    className?: string
    footerCenterElement?: React.ReactElement<any>
    moreInfo?: React.ReactNode
    dataUrl?: string
    sdgTargets: [SdgTargetType] | null
    title?: string
  }

const transitionOpts = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
}

/**
 * A basic configruable tile
 * @param BaseTileProps basic properties of the tile
 * @returns BaseTile
 */
export function BaseTile({
  children,
  variant,
  className = '',
  footerCenterElement,
  embedId,
  moreInfo,
  dataUrl,
  sdgTargets,
  title = '',
}: BaseTileProps) {
  const [showEmbedOverlay, setShowEmbedOverlay] = useState(false)
  const [showShareOverlay, setShowShareOverlay] = useState(false)
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [showSdgInfo, setShowSdgInfo] = useState(false)

  const embedTransitions = useTransition(showEmbedOverlay, transitionOpts)
  const shareTransitions = useTransition(showShareOverlay, transitionOpts)
  const moreInfoTransitions = useTransition(showMoreInfo, transitionOpts)
  const SdgInfoTransition = useTransition(showSdgInfo, transitionOpts)

  // scroll when info overlays open
  useEffect(() => {
    if ((showMoreInfo || showSdgInfo || showEmbedOverlay) && embedId) {
      scrollToElement(embedId)
    }
  }, [showMoreInfo, showSdgInfo, showEmbedOverlay, embedId])

  const openShareDialog = async () => {
    if (navigator && navigator.share) {
      try {
        await navigator.share({
          title: 'Frankfurt am Main',
          url: `${window.location.origin}/share/${embedId}`,
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Could not share', e)
      } finally {
        return
      }
    }

    setShowShareOverlay(true)
  }

  return (
    <div className="pb-4 md:pb-8" id={embedId}>
      <div className={cx(baseTileStyle({ variant }), className)}>
        <div className="z-0 flex w-full flex-col justify-between px-6 py-4 xs:p-8 md:p-12 lg:px-8 lg:py-6 xl:px-12 xl:py-10">
          <div>{children}</div>
          {sdgTargets &&
              <SdgInfoFooter
                label={'Mehr erfahren'}
                onMoreInfoClick={() => setShowSdgInfo(true)}
                sdgTargets={sdgTargets}
              />
            }
          <TileFooter
            dataURL={dataUrl ?? null}
            hasMoreDetails={!!moreInfo}
            onEmbedClick={() => setShowEmbedOverlay(true)}
            onMoreInfoClick={() => setShowMoreInfo(true)}
            onShareClick={openShareDialog}
            title={title}
            variant={variant === 'primary' ? 'inverse' : 'primary'}
          >
            {footerCenterElement}
          </TileFooter>
        </div>
        {embedId &&
          embedTransitions(
            (styles, render) =>
              render && (
                <EmbedOverlay
                  embedId={embedId}
                  onClose={() => setShowEmbedOverlay(false)}
                  style={styles}
                />
              ),
          )}
        {embedId &&
          shareTransitions(
            (styles, render) =>
              render && (
                <ShareOverlay
                  embedId={embedId}
                  onClose={() => setShowShareOverlay(false)}
                  style={styles}
                />
              ),
          )}
        {sdgTargets &&
          SdgInfoTransition(
            (styles, render) =>
              render && (
                <SdgInfoOverlay
                  onClose={() => setShowSdgInfo(false)}
                  sdgTargets={sdgTargets}
                  style={styles}
                />
              ),
          )}
        {moreInfo &&
          moreInfoTransitions(
            (styles, render) =>
              render && (
                <MoreInfoOverlay
                  onClose={() => setShowMoreInfo(false)}
                  style={styles}
                  title={title}
                >
                  {typeof moreInfo === 'string' ? (
                    <Markdown content={moreInfo} />
                  ) : (
                    <div>{moreInfo}</div>
                  )}
                </MoreInfoOverlay>
              ),
          )}
      </div>
    </div>
  )
}
