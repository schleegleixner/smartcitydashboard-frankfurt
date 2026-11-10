'use client'

import { ChartProps } from './dt'
import Chart from '@/components/Tiles/Base/Chart'
import { getString } from '@schleegleixner/react-statamic-api'

export default function ChartContent({
  tile_payload,
  switch: toggle,
  datasource,
}: ChartProps) {
  return (
    <Chart
      chart_type={'bar'}
      datasource={datasource}
      layout={tile_payload.layout}
      stacked={tile_payload.chart_variant === 'stacked'}
      switch={toggle}
      reverse_axis={tile_payload.time_axis_direction === 'vertical'}
      title={getString(tile_payload, 'chart_title')}
    />
  )
}
