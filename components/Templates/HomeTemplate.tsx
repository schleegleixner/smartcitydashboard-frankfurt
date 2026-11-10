'use client'

import Container from '@/components/Layout/Container'
import PageIntro from '@/components/Elements/PageIntro'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'
import Searchfield from '@/components/Elements/Searchfield'
import React, { JSX } from 'react'
import { useTileset } from '@/hooks/useTileset'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import TileCollection from '@/components/Elements/TileCollection'
import Spacer from '../Elements/Spacer'
import FieldLink from '../Layout/FieldLink'
import ActionFieldList from '../Layout/ActionFieldList'
import Grid from '../Layout/Grid'
import ContentTile, {
  ContentTileProps,
} from '@/components/Elements/ContentTile'
import {
  ContentImage,
  getGlobalString,
  PageMappingType,
} from '@schleegleixner/react-statamic-api'
import ContentBox from '@/components/Layout/ContentBox'
import { getVariantType } from '@/utils/payload'

export default function HomeTemplate({
  sitemap,
  page_data,
}: {
  sitemap: PageMappingType[]
  page_data: PageMappingType
}): JSX.Element {
  const { collection, is_loading, has_error } = useTileset(page_data.site_id)

  if (is_loading || has_error || !collection) {
    return (
      <Container>
        <RequestIndicator failed={has_error} timeoutMs={10000} />
      </Container>
    )
  }

  const field_pages = sitemap.filter((page: any) => page.content.action_field)

  // filter collection, allow only entries with content.highlight == true
  const highlighted_collection = collection.filter(
    (entry: any) => entry.content.highlight === true,
  )

  return (
    <>
      <div>
        {page_data.content.hero_image && (
          <div className="relative mb-8 max-h-[67vh] w-full bg-slate-200 lg:aspect-[16/5] lg:min-h-80">
            <div className="absolute inset-0">
              <ContentImage
                className="absolute object-cover"
                src={page_data.content.hero_image}
              />
            </div>
            <div className="relative left-0 top-0 z-10 flex h-full w-full items-end justify-start py-6 lg:absolute">
              <Container>
                <div className="flex w-fit flex-col items-start gap-4">
                  <div className="rounded-intangible w-fit border-b-4 border-ivory bg-white px-6 py-4 xs:px-8 md:px-12 lg:px-8 lg:py-6 xl:px-12">
                    {page_data.content.hero_topline && (
                      <Text
                        className="mb-2 text-sm uppercase"
                        variant="primary"
                      >
                        {page_data.content.hero_topline}
                      </Text>
                    )}
                    <Title as="h1" margin="none" variant="primary">
                      {page_data.content.hero_headline}
                    </Title>
                  </div>
                  <Searchfield />
                </div>
              </Container>
            </div>
          </div>
        )}

        {page_data.content.copy && (
          <Container variant="compact">
            <div className="mb-8 flex w-full flex-col gap-8">
              <PageIntro
                content={page_data.content.copy}
                headline={page_data.content.headline}
              />
            </div>
          </Container>
        )}

        <Container variant="compact">
          <div className="mb-8 flex w-full flex-col gap-8">
            <Grid>
              {page_data.content.content_tiles &&
                page_data.content.content_tiles.map(
                  (tile: ContentTileProps, index: number) => {
                    return <ContentTile key={index} {...tile} />
                  },
                )}
            </Grid>
          </div>
        </Container>

        <Container variant="compact">
          <Text bold className="uppercase" family="condensed">
            {getGlobalString('handlungsfelder')}:
          </Text>
          <Spacer size="sm" />
          <ActionFieldList sitemap={sitemap} size="lg" />
        </Container>
      </div>

      {/* show collection for each field_pages entry */}
      {field_pages.map(field_page => (
        <Container key={field_page.slug}>
          <ContentBox className="mb-8" variant={getVariantType(field_page)}>
            <Title as="h3" margin="none">
              {field_page.title}
            </Title>
          </ContentBox>

          <TileCollection
            action_field={field_page.content.action_field}
            collection={highlighted_collection}
          />
          <FieldLink
            label={`Alle Kacheln zu ${field_page.title}`}
            page={field_page}
          />
        </Container>
      ))}
    </>
  )
}
