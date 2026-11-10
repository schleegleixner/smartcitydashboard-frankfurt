import type { MetadataRoute } from 'next'
import { createManifest } from '@schleegleixner/react-statamic-api'

export default function manifest(): MetadataRoute.Manifest {
  return createManifest({
    name: 'Nachhaltigkeitsdashboard FFM',
    short_name: 'ND-FFM',
    description: 'Nachhaltigkeitsdashboard Frankfurt am Main',
    theme_color: '#37444d',
    background_color: '#ffffff',
  })
}
