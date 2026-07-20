import React, { useEffect, useRef, useState } from 'react'
import Background from '@/components/Layout/Background'
import Container from '@/components/Layout/Container'
import LinkComponent, { LinkProps } from './LinkComponent'
import BarLink from './BarLink'
import { scrollToElement } from '@/utils/scroll'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Collapsible from '@/components/Elements/Collapsible'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Text from '@/components/Elements/Text'
import MenuButton from './Buttons/MenuButton'
import HomeButton from './Buttons/HomeButton'
import SearchButton from './Buttons/SearchButton'
import { getGlobalString } from '@schleegleixner/react-statamic-api'
import ActionFieldList from '../ActionFieldList'

type BaseNavbarProps = {
  children?: React.ReactNode
  current_url: string
  site_id: string
  sitemap: PageMappingType[]
  page_title?: string
  variant?: 'primary' | 'secondary'
}

export default function BaseNavbar({
  current_url,
  page_title,
  site_id,
  sitemap,
  variant = 'primary',
}: BaseNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [nav_links, setNavLinks] = useState<LinkProps[]>([])
  const navbarRef = useRef<HTMLDivElement | null>(null)

  // foreach link in sitemap, add the link to links_categories
  useEffect(() => {
    if (!sitemap || sitemap.length === 0) {
      return
    }

    const fetchLinks = async () => {
      const menu_links = sitemap
        .filter((page: any) => page.content.menu_position === 'main')
        .map((page: any) => ({
          title: page.title,
          link: `${page.full_url}`,
          icon:
            page.content.page_type === 'search'
              ? MagnifyingGlassIcon
              : undefined,
        }))

      setNavLinks([...menu_links])
    }

    fetchLinks()
  }, [sitemap])

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const { top } = navbarRef.current.getBoundingClientRect()
        if (window?.scrollY === 0) {
          setIsSticky(false)
        } else if (top <= 0) {
          setIsSticky(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuToggle = () => {
    if (!isOpen) {
      scrollToElement('content', 0, true)
    }
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    scrollToElement('app-root', 0)
    setIsOpen(false)
  }

  const button_variants: Partial<LinkProps> = {
    variant: 'inverse',
    size: 'md',
  }

  const button_classes = 'max-xl:min-w-80 hyphens-auto font-condensed uppercase'

  return (
    <nav
      aria-label="Hauptnavigation"
      className={`sticky top-0 z-50 max-h-[100dvh] overflow-auto transition-all [&.is-sticky]:shadow-lg ${isSticky ? 'is-sticky' : 'not-sticky'}`}
      id="navbar"
      ref={navbarRef}
    >
      <Background className={''} variant={variant}>
        <Container className={''} variant={'flat'}>
          <div className="flex h-full w-full flex-col justify-between gap-4">
            <div className="flex h-20 items-stretch justify-between gap-8 text-white">
              {/* LEFT */}
              <div className="flex min-w-0 items-center gap-4">
                {' '}
                {/* <= erlaubt Schrumpfen */}
                <HomeButton href={`/${site_id !== 'default' ? site_id : ''}`} />
                <MenuButton isOpen={isOpen} setIsOpen={handleMenuToggle} />
                <div className="ml-2 hidden min-w-0 flex-shrink items-center gap-2 xs:flex">
                  <ChevronRightIcon className="inline h-4 w-4 shrink-0 text-white" />
                  <Text className="block max-w-full flex-shrink truncate text-white">
                    {page_title || 'SDD Frankfurt'}
                  </Text>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex h-20 items-center lg:h-full">
                <div className="hidden h-full flex-row items-stretch border-r border-light lg:flex">
                  {nav_links.map(l => (
                    <BarLink
                      key={l.link}
                      {...l}
                      LinkClass={
                        l.link.replace(/^\//, '') === current_url
                          ? 'active'
                          : ''
                      }
                      onClick={handleLinkClick}
                    />
                  ))}
                </div>
                <div className="items-center lg:hidden">
                  <SearchButton href={'/suche'} />
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Collapsible isOpen={isOpen} onOpenChange={handleMenuToggle}>
          <Container variant="flat">
            <div className="flex flex-col gap-4 border-t-4 border-light pb-4 text-white">
              <div className={'mt-4 flex flex-col gap-2 lg:hidden lg:gap-4'}>
                <div className={'flex flex-col lg:gap-2'}>
                  {nav_links.map(l => (
                    <LinkComponent
                      key={l.link}
                      {...button_variants}
                      {...l}
                      ButtonClass={button_classes}
                      LinkClass={
                        l.link.replace(/^\//, '') === current_url
                          ? 'active'
                          : ''
                      }
                      onClick={handleLinkClick}
                    />
                  ))}
                </div>
              </div>
              <div className={'flex flex-col gap-2 py-4 lg:gap-4'}>
                <Text bold className="uppercase" family="condensed">
                  {getGlobalString('handlungsfelder')}:
                </Text>
                <ActionFieldList
                  hideIcon={true}
                  onClick={handleLinkClick}
                  sitemap={sitemap}
                />
              </div>
            </div>
          </Container>
        </Collapsible>
      </Background>
    </nav>
  )
}
