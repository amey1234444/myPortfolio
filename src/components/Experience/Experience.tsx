import { KeyboardEvent, useRef, useState } from 'react'

import { experiences } from '../../data/experience'
import { usePortfolioMotion } from '../Motion/MotionContext'
import { Arrow } from '../Portfolio/Elements'

export default function Experience() {
  const { paused, reduced } = usePortfolioMotion()
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const experience = experiences[selected]

  const moveTo = (next: number) => {
    setSelected(next)
    tabs.current[next]?.focus({ preventScroll: true })
    tabs.current[next]?.scrollIntoView?.({
      block: 'start',
      behavior: paused || reduced ? 'auto' : 'smooth',
    })
  }

  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let next = index
    if (event.key === 'ArrowRight') {
      next = (index + 1) % experiences.length
    } else if (event.key === 'ArrowLeft') {
      next = (index + experiences.length - 1) % experiences.length
    } else if (event.key === 'Home') {
      next = 0
    } else if (event.key === 'End') {
      next = experiences.length - 1
    } else {
      return
    }
    event.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return (
    <section
      className="experience-section"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="experience-heading reveal">
        <div>
          <p className="eyebrow">EXPERIENCE / 2025 — 2026</p>
          <h2 id="experience-heading">
            Learning by
            <br />
            <span>building.</span>
          </h2>
        </div>
        <p>
          Three teams. Different challenges.
          <br />A deeper understanding of what good software takes.
        </p>
      </div>
      <div
        className="experience-tabs"
        role="tablist"
        aria-label="Work experience"
      >
        {experiences.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              tabs.current[index] = element
            }}
            type="button"
            role="tab"
            id={`experience-tab-${item.id}`}
            aria-controls={`experience-panel-${item.id}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            data-tone={item.theme}
          >
            <span className="experience-tab-meta">
              <span>0{index + 1}</span>
              <span>{item.date}</span>
            </span>
            <strong>{item.company}</strong>
            <span className="experience-tab-role">{item.role}</span>
            <span className="experience-tab-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      {experiences.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`experience-panel-${item.id}`}
          aria-labelledby={`experience-tab-${item.id}`}
          hidden={selected !== index}
          tabIndex={0}
          className="experience-panel"
          data-tone={item.theme}
        >
          {selected === index && (
            <div className="experience-sheet" key={item.id}>
              <div className="experience-story">
                <div className="experience-story-top">
                  <span className="experience-stamp">{item.focus}</span>
                  <span className="experience-flower" aria-hidden="true">
                    ✳
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p className="experience-role">
                  {item.role}
                  <br />
                  <span>
                    {item.team} · {item.date}
                  </span>
                </p>
                <p className="experience-summary">{item.summary}</p>
                <dl className="experience-metrics">
                  {item.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt>{metric.label}</dt>
                      <dd>{metric.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="experience-stack">
                  <h4>IN THE TOOLKIT</h4>
                  <ul>
                    {item.stack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="experience-details">
                <p className="eyebrow">WHAT I WORKED ON</p>
                <ol>
                  {item.contributions.map((contribution, contributionIndex) => (
                    <li
                      key={contribution.title}
                      style={{
                        animationDelay: `${contributionIndex * 65 + 80}ms`,
                      }}
                    >
                      <span aria-hidden="true">0{contributionIndex + 1}</span>
                      <div>
                        <h4>{contribution.title}</h4>
                        <p>{contribution.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="experience-footnote">
                  <span aria-hidden="true">↳</span> {item.company} /{' '}
                  {item.period}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="experience-navigation">
        <span>
          0{selected + 1} / 03{' '}
          <span className="experience-navigation-label">
            — {experience.company}
          </span>
        </span>
        <div>
          <button
            type="button"
            aria-label="Previous experience"
            onClick={() =>
              moveTo((selected + experiences.length - 1) % experiences.length)
            }
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Next experience"
            onClick={() => moveTo((selected + 1) % experiences.length)}
          >
            <Arrow />
          </button>
        </div>
        <span className="sr-only" role="status">
          Showing {experience.company}, {experience.date}
        </span>
      </div>
    </section>
  )
}
