import { useState } from 'react'

import { profile } from '../../data/portfolio'
import { Arrow } from '../Portfolio/Elements'

const values = [
  {
    title: 'Make it work.\nThen make it feel right.',
    body: 'A useful application starts with a real problem. I enjoy building the system behind it as much as refining the details someone clicks, reads, and uses every day.',
    label: 'FUNCTION + FEELING',
  },
  {
    title: 'Stay curious.\nGo a little deeper.',
    body: 'A new framework is interesting. Understanding why something works is even better. I learn by building, asking questions, and following the parts I do not understand yet.',
    label: 'CURIOSITY + CRAFT',
  },
  {
    title: 'There is always\na better question.',
    body: 'Competitive programming taught me to look past the first solution. I bring that same habit to applications: check the assumptions, explore the edge cases, and keep simplifying.',
    label: 'LOGIC + PERSISTENCE',
  },
]
export function ValuesCard() {
  const [index, setIndex] = useState(0)
  const value = values[index]
  return (
    <section className="values-card studio-card reveal">
      <div className="card-kicker">
        <span>HOW I THINK</span>
        <span>0{index + 1} / 03</span>
      </div>
      <div
        key={index}
        className="value-content"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="value-label">{value.label}</p>
        <h2>{value.title}</h2>
        <p>{value.body}</p>
      </div>
      <div className="carousel-controls">
        <button
          type="button"
          onClick={() => setIndex((index + 2) % 3)}
          aria-label="Previous value"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setIndex((index + 1) % 3)}
          aria-label="Next value"
        >
          →
        </button>
        <span>
          {values.map((_, i) => (
            <i key={i} className={i === index ? 'active' : ''} />
          ))}
        </span>
      </div>
    </section>
  )
}

export function CuriosityCard() {
  return (
    <section className="curiosity-card studio-card reveal">
      <span className="curiosity-star" aria-hidden="true">
        ✳
      </span>
      <p className="card-kicker">ON MY MIND LATELY</p>
      <h3>
        Good questions.
        <br />
        Interesting rabbit holes.
      </h3>
      <p>
        AI applications, thoughtful interfaces, and the algorithms underneath
        them. I like learning by making something real.
      </p>
      <a href={`mailto:${profile.email}`} className="text-link">
        Swap an idea <Arrow diagonal />
      </a>
    </section>
  )
}

export function TechStrip() {
  const tech = [
    ['⚛', 'React'],
    ['N', 'Next.js'],
    ['TS', 'TypeScript'],
    ['JS', 'JavaScript'],
    ['Py', 'Python'],
    ['J', 'Java'],
    ['C++', 'C++'],
    ['Pg', 'PostgreSQL'],
  ]
  return (
    <div className="tech-strip reveal" aria-label="Technologies I work with">
      <span className="tech-strip-label">
        TOOLS OF
        <br />
        THE TRADE ↗
      </span>
      {tech.map(([icon, name]) => (
        <div className="tech-item" key={name}>
          <span aria-hidden="true">{icon}</span>
          <small>{name}</small>
        </div>
      ))}
    </div>
  )
}

export function AboutBento() {
  return (
    <div className="about-bento">
      <ValuesCard />
      <section className="education-card studio-card reveal">
        <p className="card-kicker">A LITTLE CONTEXT</p>
        <span className="education-symbol" aria-hidden="true">
          ↗
        </span>
        <div>
          <small>LEARNING</small>
          <h3>
            Vishwakarma Institute
            <br />
            of Technology
          </h3>
          <p>Electronics & Telecommunication · Pune</p>
        </div>
        <div>
          <small>GRADUATED · 2026</small>
          <h3>
            Engineering curiosity,
            <br />
            put into practice.
          </h3>
          <p>
            From full-stack interfaces to AI applications and distributed
            systems.
          </p>
        </div>
        <a href="#experience" className="text-link">
          Explore my experience <Arrow />
        </a>
      </section>
      <CuriosityCard />
      <section className="blue-note studio-card reveal">
        <span className="card-kicker">OFF THE CRITICAL PATH</span>
        <span className="note-flower" aria-hidden="true">
          ✳
        </span>
        <h3>
          A problem solver.
          <br />
          Even after hours.
        </h3>
        <p>
          Contests, side projects, and ideas scribbled down before they
          disappear.
        </p>
        <a
          href={profile.leetcode}
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          Find me on LeetCode <Arrow diagonal />
        </a>
      </section>
      <TechStrip />
    </div>
  )
}
