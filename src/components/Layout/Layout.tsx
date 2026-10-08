import { useMantineColorScheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { profile } from '../../data/portfolio'
import { ILayoutProps } from '../../interfaces/Layout.interface'
import { navigation } from '../../routes/navigation'
import Header from '../Header/Header'
import { Arrow } from '../Portfolio/Elements'

const Layout: FC<ILayoutProps> = ({ children }) => {
  const { colorScheme } = useMantineColorScheme()
  const router = useRouter()
  const [paused, setPaused] = useState(false)
  const [copyState, setCopyState] = useState('Copy email')

  useEffect(() => {
    try {
      setPaused(localStorage.getItem('portfolio-motion') === 'paused')
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    document
      .querySelectorAll('.reveal')
      .forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [router.asPath])

  useEffect(() => {
    if (copyState === 'Copy email') return undefined
    const timer = window.setTimeout(() => setCopyState('Copy email'), 3500)
    return () => window.clearTimeout(timer)
  }, [copyState])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('Email copied')
    } catch {
      setCopyState('Please select the email to copy')
    }
  }
  const toggleMotion = () => {
    setPaused(!paused)
    try {
      localStorage.setItem('portfolio-motion', !paused ? 'paused' : 'running')
    } catch {
      /* Keep the in-memory preference. */
    }
  }

  return (
    <div
      className="portfolio"
      data-theme={colorScheme}
      data-motion={paused ? 'paused' : 'running'}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header links={navigation} />
      <main id="main-content" className="site-main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer" id="contact">
        <div className="container">
          <div className="contact-heading reveal">
            <p className="eyebrow">
              <span className="status-dot" /> A CONVERSATION IS A GOOD START
            </p>
            <h2>
              Have something
              <br />
              <span className="serif">in mind?</span>
              <a
                href={`mailto:${profile.email}`}
                className="contact-arrow"
                aria-label="Email Amey"
              >
                <Arrow diagonal />
              </a>
            </h2>
          </div>
          <div className="contact-links">
            <div>
              <a className="email-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <button type="button" className="copy-button" onClick={copyEmail}>
                {copyState}
              </button>
              <span className="sr-only" role="status">
                {copyState !== 'Copy email' ? copyState : ''}
              </span>
            </div>
            <div className="social-links">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub <Arrow diagonal />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-name">
              © {new Date().getFullYear()} Amey Bhagwatkar
            </span>
            <span>Made with intention. Built with Next.js.</span>
            <button type="button" onClick={toggleMotion} aria-pressed={paused}>
              {paused ? 'Play animations' : 'Pause animations'}{' '}
              <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>
            </button>
            <a href="#main-content">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default Layout
