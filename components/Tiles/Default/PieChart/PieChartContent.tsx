'use client'

import { useState } from 'react'
import { useContentWidth } from '@schleegleixner/react-statamic-api'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import Title from '@/components/Elements/Title'
import { ChartProps } from './dt'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { getThemeColor } from '@/utils/colors'
import { cx } from 'class-variance-authority'
import Slider from '@/components/Inputs/Slider/'
import { getRows, numberFormat, RowDataCollection } from '@schleegleixner/react-statamic-api'
import RowDataType from '@/types/RowDataType'
import IconFactory from '@/utils/factories/IconFactory'
import { getStaticIcon } from '@/utils/convert'
import Carousel from '@/components/Elements/Carousel'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Text from '@/components/Elements/Text'

const breakpoint = 620

function getSeriesData(rows: RowDataCollection, width: number) {
  const data: any[] = []
  const color: string[] = []

  for (const [, row] of Object.entries(rows)) {
    const row_color = getThemeColor(row.variant ?? 'primary')
    const base_fontsize = Math.min(24, width / 40)
    const show_icon = !!row.icon && width > 728
    const svg = show_icon
      ? getStaticIcon(<IconFactory type={row.icon} />, row_color)
      : ''

    data.push({
      value: row.current ?? 0,
      name: row.label,
      label: {
        show: width >= breakpoint,
        alignTo: 'edge',
        edgeDistance: '5%',
        formatter: () =>
          `${show_icon ? '{Icon|}\n' : ''}{name|${row.label}}\n{percent|${numberFormat(row.current ?? 0, row.decimals ?? undefined)}${row.unit ?? ''}}`,
        rich: {
          Icon: show_icon
            ? {
                height: Math.max(base_fontsize * 1.25, 40),
                width: Math.max(base_fontsize * 1.25, 40),
                align: 'left',
                backgroundColor: {
                  image: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
                },
              }
            : null,
          name: {
            color: row_color,
            align: 'left',
            fontSize: base_fontsize,
            padding: width <= 1280 ? [6, 0, 6, 0] : [18, 0, 6, 0],
          },
          percent: {
            color: row_color,
            align: 'left',
            fontSize: base_fontsize * 1.5,
            fontWeight: 'bold',
          },
        },
      },
    })
    color.push(row_color)
  }

  return { data, color }
}

function getCenterSeries(
  row: RowDataType | undefined,
  total: number,
  radius: string,
  width: number,
) {
  const share = total ? ((row?.current ?? 0) / total) * 100 : 0

  return {
    type: 'pie' as const,
    radius: [0, radius],
    silent: true,
    emphasis: { disabled: true },
    labelLine: { show: false },
    itemStyle: { color: 'transparent' },
    label: {
      show: true,
      position: 'center' as const,
      formatter: `${numberFormat(share, 1)}%`,
      color: getThemeColor(row?.variant ?? 'primary'),
      fontSize: width >= breakpoint ? 48 : 24,
      fontWeight: 'bold' as const,
    },
    data: [{ value: 1, name: 'center' }],
  }
}

export default function PieChartContent({
  tile_payload,
  datasource,
  variant,
}: ChartProps) {
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()

  const [yearIndex, setYearIndex] = useState(
    datasource?.entry_count ? datasource.entry_count - 1 : 0,
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const mobile = contentWidth < breakpoint
  const [prevMobile, setPrevMobile] = useState(mobile)

  if (prevMobile !== mobile) {
    setPrevMobile(mobile)
    setActiveIndex(0)
  }

  const years = datasource.timeline
  const { rows } = getRows(datasource, yearIndex) as {
    rows: Record<string, RowDataType>
  }
  const indices = getSeriesData(rows, contentWidth)

  if (!indices) {
    return <RequestIndicator failed={true} />
  }

  const highlight = tile_payload.chart_variant === 'highlight'
  const radius = highlight ? ['55%', '75%'] : ['75%', '60%']
  const row_list = Object.values(rows)
  const total = row_list.reduce((sum, row) => sum + (row.current ?? 0), 0)

  return (
    <div
      className={cx('flex w-full flex-col items-center rounded bg-white py-4')}
      ref={elRef}
    >
      <div className="h-full w-full flex-1">
        <div className="relative h-[235px] w-full md:h-[440px]">
          {tile_payload.icon && !highlight && (
            <div className="absolute h-full w-full">
              <IconFactory
                className={'h-full w-full object-contain opacity-50'}
                type={tile_payload.icon}
                variant={tile_payload.icon_variant || variant}
              />
            </div>
          )}
          <ReactECharts
            option={{
              series: [
                {
                  type: 'pie',
                  radius,
                  labelLine: {
                    show: !mobile,
                    length: 16,
                    lineStyle: {
                      color: 'black',
                      width: 1,
                    },
                  },
                  ...indices,
                },
                ...(highlight
                  ? [
                      getCenterSeries(
                        row_list[activeIndex] ?? row_list[0],
                        total,
                        radius[0],
                        contentWidth,
                      ),
                    ]
                  : []),
              ],
            }}
            onEvents={
              highlight && !mobile
                ? {
                    mouseover: params => {
                      if (params.seriesIndex === 0) {
                        setActiveIndex(params.dataIndex)
                      }
                    },
                    globalout: () => setActiveIndex(0),
                  }
                : undefined
            }
          />
        </div>

        {/* mobile view */}
        {mobile && (
          <div className="py-4">
            <Carousel
              arrowPosition="side"
              arrows
              onSelect={setActiveIndex}
              variant={variant}
            >
              {row_list.map((row, index) => (
                <div
                  className="flex flex-col items-center gap-2 text-center"
                  key={index}
                >
                  {row.icon && (
                    <IconFactory
                      className="w-12"
                      type={row.icon}
                      variant={row.variant ?? undefined}
                    />
                  )}
                  <Title as="h5" margin="none" variant={row.variant}>
                    {row.label}
                  </Title>
                  <Text as="h3" bold variant={row.variant}>
                    <AnimatedNumber decimals={row.decimals}>
                      {row.current ?? 0}
                    </AnimatedNumber>{' '}
                    {row.unit}
                  </Text>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>

      <div className="mt-4 w-full">
        <Slider labels={years} onValueChange={setYearIndex} variant={variant} />
      </div>
    </div>
  )
}
