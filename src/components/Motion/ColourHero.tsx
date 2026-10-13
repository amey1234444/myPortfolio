import Link from 'next/link'
import { CSSProperties, useEffect, useRef, useState } from 'react'

import { Arrow } from '../Portfolio/Elements'
import { usePortfolioMotion } from './MotionContext'

export const heroScenes = [
  {
    title: "Hi, I'm Amey",
    subtitle: 'Developer. Problem solver. Curious human.',
    description:
      'I build full-stack applications and AI tools. Based in Pune, always following the next good question.',
    cta: 'Meet the developer',
    href: '/about',
    tone: 'sun',
    note: 'A little logic. A little imagination.',
  },
  {
    title: 'Ideas into images',
    subtitle: 'IMG Creator',
    description:
      'An image studio with private galleries, generation workers and a training workflow. From the first prompt to the system behind it.',
    cta: 'Explore IMG Creator',
    href: '/projects/6',
    tone: 'rose',
    note: 'An experiment in possibility.',
  },
  {
    title: 'Make it connect',
    subtitle: 'GRID-X',
    description:
      'Drawings, production, inspections and partners. A shared operating system for the people making things happen.',
    cta: 'Explore GRID-X',
    href: '/projects/8',
    tone: 'sky',
    note: 'Built for the moving parts.',
  },
  {
    title: 'Find the signal',
    subtitle: 'News Platform',
    description:
      'RSS feeds become structured stories through an event-driven pipeline. Java, Kafka and a little artificial intelligence.',
    cta: 'Explore News Platform',
    href: '/projects/7',
    tone: 'lilac',
    note: 'Curiosity, delivered.',
  },
]

export default function ColourHero() {
  const [index, setIndex] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [inView, setInView] = useState(true)
  const [visible, setVisible] = useState(true)
  const [announcement, setAnnouncement] = useState('')
  const root = useRef<HTMLElement>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const { paused, reduced, toggleMotion } = usePortfolioMotion()
  const running =
    !paused && !reduced && !hovering && !interacting && inView && visible
  const scene = heroScenes[index]

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    if (!('IntersectionObserver' in window)) {
      return () =>
        document.removeEventListener('visibilitychange', onVisibility)
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    )
    if (root.current) observer.observe(root.current)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!running) return undefined
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % heroScenes.length),
      7500
    )
    return () => window.clearTimeout(timer)
  }, [index, running])

  const choose = (next: number) => {
    const target = (next + heroScenes.length) % heroScenes.length
    setIndex(target)
    setInteracting(true)
    setAnnouncement(
      `${heroScenes[target].title}, slide ${target + 1} of ${heroScenes.length}`
    )
  }

  return (
    <section
      ref={root}
      className="colour-hero"
      data-tone={scene.tone}
      aria-label="Introduction and selected projects"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest('.hero-motion')) {
          setInteracting(true)
        }
      }}
      onTouchStart={(event) => {
        touch.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        }
      }}
      onTouchEnd={(event) => {
        if (!touch.current) return
        const dx = event.changedTouches[0].clientX - touch.current.x
        const dy = event.changedTouches[0].clientY - touch.current.y
        if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          choose(index + (dx < 0 ? 1 : -1))
        }
        touch.current = null
      }}
    >
      <div
        key={`wash-${index}`}
        className="hero-colour-wash"
        aria-hidden="true"
      />
      <div className="hero-margin-note" aria-hidden="true">
        AMEY BHAGWATKAR / PUNE, INDIA
      </div>
      <div className="hero-scene" key={index}>
        <div className="hero-doodle" aria-hidden="true">
          ✳
        </div>
        <h1 className="drawn-title" aria-label={scene.title}>
          {scene.title.split(' ').map((word, wi) => (
            <span
              className="drawn-word"
              aria-hidden="true"
              key={`${word}-${wi}`}
            >
              {Array.from(word).map((letter, li) => (
                <span
                  className="drawn-letter"
                  data-letter={letter}
                  key={`${letter}-${li}`}
                  style={{ '--letter': wi * 4 + li } as CSSProperties}
                >
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-subtitle">{scene.subtitle}</p>
        <p className="hero-description">{scene.description}</p>
        <Link href={scene.href} className="hero-cta">
          {scene.cta}
          <Arrow diagonal />
        </Link>
      </div>
      <div
        className="hero-pagination"
        role="group"
        aria-label="Choose introduction slide"
      >
        <button
          type="button"
          className="hero-arrow"
          aria-label="Previous slide"
          onClick={() => choose(index - 1)}
        >
          ←
        </button>
        {heroScenes.map((item, i) => (
          <button
            key={item.title}
            type="button"
            className="hero-dot"
            aria-label={`Show ${item.title}`}
            aria-pressed={index === i}
            onClick={() => choose(i)}
          >
            <span />
          </button>
        ))}
        <button
          type="button"
          className="hero-arrow"
          aria-label="Next slide"
          onClick={() => choose(index + 1)}
        >
          →
        </button>
      </div>
      <div className="hero-bottom-bar">
        <span className="hero-handnote">{scene.note}</span>
        <a href="#work" className="hero-scroll">
          Selected work <span aria-hidden="true">↓</span>
        </a>
        <button
          className="hero-motion"
          type="button"
          onClick={() => {
            if (paused) toggleMotion()
            else if (!interacting) toggleMotion()
            setInteracting(false)
          }}
          aria-label={
            paused || interacting ? 'Play slideshow' : 'Pause slideshow'
          }
          disabled={reduced}
        >
          {reduced
            ? 'Reduced motion'
            : paused || interacting
            ? 'Play slideshow ▷'
            : 'Pause slideshow Ⅱ'}
        </button>
      </div>
      <div
        className="hero-timer"
        key={`timer-${index}-${running}`}
        data-running={running}
        aria-hidden="true"
      >
        <span />
      </div>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </section>
  )
}
