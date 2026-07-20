'use client'

import React, { JSX } from 'react'
import Spinner from '@/components/Elements/Spinner'
import Container from '@/components/Layout/Container'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import Grid from '../Layout/Grid'
import ContentTile, {
  ContentTileProps,
} from '@/components/Elements/ContentTile'
import PageHeader from '@/components/Layout/PageHeader'

export default function ContentTemplate({
  page_data,
}: {
  page_data: PageMappingType
}): JSX.Element {
  if (!page_data) {
    return (
      <Container>
        <Spinner className="mx-auto" />
      </Container>
    )
  }

  return (
    <>
      <PageHeader page_data={page_data} />
      <Container>
        <div className="mb-8 flex w-full flex-col gap-8">
          <Grid>
            {page_data.content.content && (
              <ContentTile {...page_data.content} />
            )}
            {page_data.content.content_tiles &&
              page_data.content.content_tiles.map(
                (tile: ContentTileProps, index: number) => {
                  return <ContentTile key={index} {...tile} />
                },
              )}
          </Grid>
        </div>
      </Container>
    </>
  )
}
