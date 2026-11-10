'use client'

import Link from 'next/link'
import Background from '../Background'
import Container from '../Container'
import StadtLogo from '@/assets/logos/logo_frankfurt.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import Text from '@/components/Elements/Text'

export type LinkProps = {
  ariaLabel?: string
  title?: string
  link: string
}

export default function Footer({ sitemap }: { sitemap: PageMappingType[] }) {
  const [nav_links, setNavLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    if (!sitemap || sitemap.length === 0) {
      return
    }

    const fetchLinks = async () => {
      const footer_links = sitemap
        .filter((page: any) => page.content.menu_position === 'footer')
        .map((page: any) => ({
          title: page.title,
          link: `${page.full_url}`,
        }))

      setNavLinks([...footer_links])
    }

    fetchLinks()
  }, [sitemap])

  return (
    <Background className="border-b-[30px] border-secondary bg-white leading-4">
      <Container>
        <footer className="flex flex-col items-center gap-6 mx-2 py-2">
          <div className="w-full border-t border-b border-grey-300 py-4 text-center">
            <Link
              aria-label="Zur Webseite der Stadt Frankfurt am Main"
              className="inline-block"
              href="https://www.frankfurt.de"
              target="_blank"
            >
              <Image
                alt="Logo der Stadt Frankfurt am Main"
                className="pointer-events-none ml-auto h-10 w-auto md:h-16"
                src={StadtLogo}
              />
            </Link>
          </div>
          <div className="font-condensed flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm uppercase text-gray-600">
            {nav_links.map((link: LinkProps) => (
              <Link
                aria-label={link.ariaLabel ?? link.title}
                className="transition-colors hover:bg-primary hover:text-white px-2 py-0.5"
                href={link.link}
                key={link.link}
                target={link.link.startsWith('http') ? '_blank' : '_self'}
              >
                <Text as="md" family="condensed">{link.title}</Text>
              </Link>
            ))}
          </div>
        </footer>
      </Container>
    </Background>
  )
}
