import { CSSProperties, ReactNode } from 'react'

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string
  label: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="section-heading reveal">
      <div>
        <p className="eyebrow">
          <span>{number} /</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  )
}

export function PageIntro({
  label,
  title,
  description,
}: {
  label: string
  title: ReactNode
  description: string
}) {
  return (
    <div className="page-intro reveal">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="intro-description">{description}</p>
    </div>
  )
}

export function OrbitalArt() {
  return (
    <div className="orbital-art" aria-hidden="true">
      <div className="orbit-grid" />
      <span className="art-coordinate coordinate-top">
        FIG. 01 — ALWAYS IN PROGRESS
      </span>
      <div className="orbit-system">
        {Array.from({ length: 9 }, (_, i) => (
          <div
            className="orbit-ring"
            key={i}
            style={{ '--ring': i } as CSSProperties}
          />
        ))}
        <div className="orbit-core">
          <span>ab.</span>
        </div>
      </div>
      <div className="art-note note-top">
        <span className="tiny-cross">+</span> LOGIC
      </div>
      <div className="art-note note-bottom">
        CRAFT <span className="tiny-cross">+</span>
      </div>
      <span className="art-coordinate coordinate-bottom">
        IDEA → CODE → EXPERIENCE
      </span>
      <div className="orbit-label">
        <span className="status-dot" /> BUILT WITH CURIOSITY
      </div>
    </div>
  )
}
