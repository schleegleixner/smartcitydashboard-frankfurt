import Text from '@/components/Elements/Title'
import Link from 'next/link'
import StadtLogo from '@/assets/logos/logo_frankfurt.png'
import { TileType } from '@schleegleixner/react-statamic-api'
import Image from 'next/image'
import ShareTemplate from '@/components/Templates/ShareTemplate'

export const revalidate = false

export default async function Embed(props: {
  params: Promise<{ id: TileType; locale: string }>
}) {
  const params = await props.params
  const { id, locale: site_id } = params

  const url = process.env.NEXT_PUBLIC_URL || ''

  return (
    <div>
      <ShareTemplate site_id={site_id} tile_id={id} />

      <div className="mt-4 flex h-full w-full flex-col justify-end gap-4 md:flex-row md:items-center">
        <Image
          alt="Logo der Stadt Frankfurt am Main"
          className="h-10 w-fit"
          src={StadtLogo}
        />
        <Text as="h7" className="leading-normal" variant={'primary'}>
          Mehr gibt es unter{' '}
          <Link className="underline" href={`${url}`} target="_blank">
            {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </Link>
        </Text>
      </div>
    </div>
  )
}
