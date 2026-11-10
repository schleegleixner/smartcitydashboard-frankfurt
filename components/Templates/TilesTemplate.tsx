'use client'

import React, { JSX } from 'react'
import Container from '@/components/Layout/Container'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import PageIntro from '@/components/Elements/PageIntro'
import TileCollectionView from '@/components/Views/TileCollectionView'
import { useTileset } from '@/hooks/useTileset'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import PageHeader from '@/components/Layout/PageHeader'
import { ActionFieldsIconMap } from '@/mapping/ActionFieldsMapping'
import { cx } from 'class-variance-authority'
import { getVariantType } from '@/utils/payload'
import Text from '@/components/Elements/Text'
import ActionFieldList from '../Layout/ActionFieldList'
import Divider from '@/components/Elements/Divider'
import { getGlobalString } from '@schleegleixner/react-statamic-api'
import { TextStyle } from '@/utils/variants/TextVariants'

export default function TilesTemplate({
  sitemap,
  page_data,
}: {
  sitemap: PageMappingType[]
  page_data: PageMappingType
}): JSX.Element {
  const { collection, is_loading, has_error } = useTileset(page_data?.site_id)
  const variant = getVariantType(page_data)

  if (is_loading || has_error || !collection) {
    return (
      <Container>
        <RequestIndicator failed={has_error} timeoutMs={10000} />
      </Container>
    )
  }

  const Icon =
    ActionFieldsIconMap[
      page_data?.content?.action_field as keyof typeof ActionFieldsIconMap
    ] || (() => <></>)

  return (
    <>
      <PageHeader
        Icon={
          <Icon
            className={cx(
              'h-full w-full object-contain',
              TextStyle({ variant }),
            )}
          />
        }
        page_data={page_data}
        topline={getGlobalString('handlungsfeld')}
      />
      <PageIntro
        container
        content={page_data.content.copy}
        headline={page_data.content.headline}
      />
      <Container>
        <TileCollectionView
          collection={collection}
          page_data={page_data}
          sitemap={sitemap}
        />
        <Divider variant="white" />
        <div className={'flex flex-col gap-2 py-4 lg:gap-4'}>
          <Text bold className="uppercase" family="condensed">
            {getGlobalString('weitere_handlungsfelder')}:
          </Text>
          <ActionFieldList
            exclude={[page_data.slug]}
            sitemap={sitemap}
            size="lg"
          />
        </div>
      </Container>
    </>
  )
}
