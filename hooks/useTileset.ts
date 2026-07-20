'use client'

import { useEffect, useState } from 'react'
import { getTaxonomy, getTileset } from '@schleegleixner/react-statamic-api'

export function useTileset(site_id: string = 'default') {
  const [collection, setCollection] = useState<any | null>(null)
  const [is_loading, setIsLoading] = useState<boolean>(false)
  const [has_error, setHasError] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)

    const fetchData = async () => {
      try {
        const tileset = await getTileset(site_id)
        const sdg_taxonomy = await getTaxonomy('sdg_targets', site_id)

        // merge sdg data into tileset (multiple targets per entry possible)
        const merged = tileset.map((entry: any) => {
          const sdg_terms = (entry.content?.tags?.sdg_targets ?? [])
            .map((slug: string) => {
              const term = sdg_taxonomy.find((t: any) => t.slug === slug)
              if (term == null) {
                return null
              }

              const normalized = { ...term, data: { ...term.data } }
              if (normalized.data?.title) {
                const parts = normalized.data.title.split(/\s*[-–—]\s*/) // split by dash variants
                normalized.data.title = parts[1] ?? parts[0] ?? ''
              }

              return normalized
            })
            .filter(Boolean)

          return {
            ...entry,
            content: {
              ...entry.content,
              sdg_targets: sdg_terms,
            },
          }
        })

        setCollection(merged)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [site_id])

  return { collection, is_loading, has_error }
}
