import Link from 'next/link'
import { useState } from 'react'

import { profile } from '../../data/portfolio'
import { Arrow } from '../Portfolio/Elements'

const disciplines = [
  {
    name: 'Interface',
    file: 'experience.tsx',
    code: [
      'const experience = {',
      '  thoughtful: true,',
      '  accessible: true,',
      '  builtFor: "people",',
      '};',
    ],
    note: 'Small details. A better experience.',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  {
    name: 'Systems',
    file: 'server.ts',
    code: [
      'const application = {',
      '  api: "Express",',
      '  data: "PostgreSQL",',
      '  focus: "reliability",',
      '};',
    ],
    note: 'Good interfaces need good foundations.',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
  },
  {
    name: 'Intelligence',
    file: 'agent.py',
    code: [
      'def build_agent(context):',
      '    understand(context)',
      '    retrieve_knowledge()',
      '    reason_with_tools()',
      '    return useful_answer',
    ],
    note: 'Turning curiosity into useful tools.',
    tags: ['Python', 'LangChain', 'LangGraph'],
  },
]

export function Workbench() {
  const [selected, setSelected] = useState(0)
  const item = disciplines[selected]
  return (
    <div className="workbench">
      <div className="bench-top">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>amey / workbench</span>
        <span>↗</span>
      </div>
      <div
        className="bench-tabs"
        role="group"
        aria-label="Explore my disciplines"
      >
        {disciplines.map((d, i) => (
          <button
            key={d.name}
            type="button"
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {d.name}
          </button>
        ))}
      </div>
      <div className="bench-code" key={item.file}>
        <span className="file-label">{item.file}</span>
        <pre>
          {item.code.map((line, i) => (
            <span key={line}>
              <i aria-hidden="true">0{i + 1}</i>
              {line}
              {'\n'}
            </span>
          ))}
        </pre>
      </div>
      <div className="bench-result">
        <span className="result-symbol" aria-hidden="true">
          ✳
        </span>
        <div>
          <small>THE OUTPUT</small>
          <p>{item.note}</p>
        </div>
      </div>
      <div className="bench-stack">
        {item.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
        <span className="terminal-cursor" aria-hidden="true">
          ▌
        </span>
      </div>
    </div>
  )
}

export function StudioHero() {
  return (
    <section className="studio-hero container">
      <div className="studio-kicker">
        <span>
          <i className="status-dot" /> SOFTWARE DEVELOPER, CURIOUS HUMAN
        </span>
        <span>PUNE, INDIA ↗</span>
      </div>
      <div className="studio-hero-grid">
        <div className="studio-intro">
          <p className="handwritten">Hey, I&apos;m Amey.</p>
          <h1>
            I build things
            <br />
            for the <span className="ink-underline">real world.</span>
          </h1>
          <p className="studio-description">
            Full-stack applications, AI experiments, and the occasional rabbit
            hole. I like turning a difficult problem into something simple to
            use.
          </p>
          <div className="studio-actions">
            <Link className="button button-primary" href="/projects">
              Explore my work <Arrow diagonal />
            </Link>
            <Link className="text-link" href="/about">
              Meet the developer <Arrow />
            </Link>
          </div>
          <div className="hero-personal-note">
            <span aria-hidden="true">↳</span> Part logic. Part imagination.
            Always learning.
          </div>
        </div>
        <div className="hero-workbench">
          <div className="paper-label">FROM IDEA TO INTERACTION ↙</div>
          <Workbench />
          <span className="build-sticker">
            built with
            <br />
            <b>curiosity.</b>
            <span aria-hidden="true">✦</span>
          </span>
        </div>
      </div>
      <div className="nameplate" aria-hidden="true">
        <span>AMEY</span>
        <span>BHAGWATKAR</span>
        <span className="nameplate-star">✳</span>
      </div>
      <div className="hero-colophon">
        <span>ENGINEERING / DESIGN / EXPERIMENTS</span>
        <a href="#work">TAKE A LOOK AROUND ↓</a>
      </div>
    </section>
  )
}

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

export function TerminalCard() {
  return (
    <section className="terminal-card studio-card reveal">
      <div className="bench-top">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>amey@portfolio — zsh</span>
      </div>
      <div className="terminal-body">
        <p>
          <span>~/amey</span> $ cat interests.txt
        </p>
        <ul>
          <li>Full-stack web development</li>
          <li>AI applications & developer tools</li>
          <li>Algorithms & competitive programming</li>
        </ul>
        <p>
          <span>~/amey</span> $ ./say_hello
          <span className="terminal-cursor" aria-hidden="true">
            ▌
          </span>
        </p>
        <a href={`mailto:${profile.email}`}>
          Start a conversation <Arrow diagonal />
        </a>
      </div>
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
          <small>BUILDING</small>
          <h3>MTB Solutions</h3>
          <p>Web Developer Intern · 2024</p>
        </div>
        <Link href="/timeline" className="text-link">
          Explore my journey <Arrow />
        </Link>
      </section>
      <TerminalCard />
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
