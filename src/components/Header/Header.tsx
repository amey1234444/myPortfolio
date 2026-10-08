import { useMantineColorScheme } from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { IHeaderProps } from '../../interfaces/Header.interface'
import { Arrow } from '../Portfolio/Elements'

const Header = ({ links }: IHeaderProps) => {
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  useEffect(() => {
    setOpened(false)
  }, [router.asPath])

  useEffect(() => {
    if (!opened) return undefined
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpened(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [opened])

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Amey Bhagwatkar home">
          ab<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              href={link.link}
              key={link.link}
              aria-current={router.pathname === link.link ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="icon-button search-trigger"
            onClick={() => openSpotlight()}
            aria-label="Search pages"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <kbd>⌘ K</kbd>
          </button>
          <button
            type="button"
            className="icon-button theme-trigger"
            onClick={() => toggleColorScheme()}
            aria-label={`Switch to ${
              colorScheme === 'dark' ? 'light' : 'dark'
            } theme`}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
            </svg>
          </button>
          <a className="header-contact" href="#contact">
            Let&apos;s talk <Arrow diagonal />
          </a>
          <button
            ref={menuButton}
            type="button"
            className={`icon-button menu-toggle ${opened ? 'is-open' : ''}`}
            aria-label={opened ? 'Close navigation' : 'Open navigation'}
            aria-expanded={opened}
            aria-controls="mobile-navigation"
            onClick={() => setOpened(!opened)}
          >
            <span />
            <span />
          </button>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
          hidden={!opened}
        >
          {links.map((link, i) => (
            <Link
              href={link.link}
              key={link.link}
              aria-current={router.pathname === link.link ? 'page' : undefined}
              onClick={() => setOpened(false)}
            >
              <span>0{i + 1}</span>
              {link.label}
              <Arrow diagonal />
            </Link>
          ))}
          <a href="#contact" onClick={() => setOpened(false)}>
            Get in touch <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  )
}
export default Header
