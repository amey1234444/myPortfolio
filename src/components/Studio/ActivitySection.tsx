import { KeyboardEvent, useEffect, useRef, useState } from 'react'

import { profile } from '../../data/portfolio'
import { ActivityData } from '../../lib/activity'
import { Arrow, SectionHeading } from '../Portfolio/Elements'

function Heatmap({ data, platform }: { data: ActivityData; platform: string }) {
  const [active, setActive] = useState(data.days.length - 1)
  const [hover, setHover] = useState<number | null>(null)
  const cells = useRef<(HTMLButtonElement | null)[]>([])
  const offset = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay()
  const unit = platform === 'github' ? 'contributions' : 'submissions'
  const day = data.days[hover ?? active]
  const max = Math.max(1, ...data.days.map((d) => d.count || 0))
  const move = (event: KeyboardEvent, index: number) => {
    const delta: Record<string, number> = {
      ArrowLeft: -7,
      ArrowRight: 7,
      ArrowUp: -1,
      ArrowDown: 1,
    }
    let next = index
    if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = data.days.length - 1
    else if (event.key in delta) next += delta[event.key]
    else return
    event.preventDefault()
    next = Math.max(0, Math.min(data.days.length - 1, next))
    setActive(next)
    setHover(null)
    cells.current[next]?.focus()
  }
  const description = (date: string, count: number | null) =>
    `${date}: ${count === null ? 'data not yet available' : `${count} ${unit}`}`
  return (
    <>
      <div
        className="heatmap-scroll"
        role="group"
        aria-label={`${platform} activity calendar. Use arrow keys to explore days, Home and End to jump.`}
      >
        <div className="heatmap-months" aria-hidden="true">
          {data.days.map(
            (d, i) =>
              (i === 0 || d.date.endsWith('-01')) && (
                <span
                  key={d.date}
                  style={{ gridColumn: Math.floor((i + offset) / 7) + 1 }}
                >
                  {new Date(`${d.date}T00:00:00Z`).toLocaleDateString('en', {
                    month: 'short',
                    timeZone: 'UTC',
                  })}
                </span>
              )
          )}
        </div>
        <div className="heatmap-grid">
          {data.days.map((d, i) => (
            <button
              key={d.date}
              ref={(el) => {
                cells.current[i] = el
              }}
              type="button"
              className="heatmap-cell"
              data-level={
                d.count === null
                  ? 'unknown'
                  : d.count === 0
                  ? 0
                  : Math.min(4, Math.ceil(Math.sqrt(d.count / max) * 4))
              }
              style={{
                gridColumn: Math.floor((i + offset) / 7) + 1,
                gridRow: ((i + offset) % 7) + 1,
              }}
              tabIndex={active === i ? 0 : -1}
              aria-label={description(d.date, d.count)}
              title={description(d.date, d.count)}
              onKeyDown={(e) => move(e, i)}
              onFocus={() => setActive(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
      <div className="heatmap-bottom">
        <p aria-live="polite">{description(day.date, day.count)}</p>
        <span className="heatmap-legend">
          Less{' '}
          {[0, 1, 2, 3, 4].map((n) => (
            <i key={n} data-level={n} />
          ))}{' '}
          More
        </span>
      </div>
    </>
  )
}

export function ActivityCard({
  platform,
}: {
  platform: 'github' | 'leetcode'
}) {
  const [data, setData] = useState<ActivityData | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const label = platform === 'github' ? 'GitHub' : 'LeetCode'
  useEffect(() => {
    const controller = new AbortController()
    let disposed = false
    const timeout = window.setTimeout(() => controller.abort(), 15000)
    setError(false)
    fetch(`/api/activity?platform=${platform}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unavailable')
        const result = await response.json()
        if (!Array.isArray(result.days) || result.days.length !== 365) throw new Error('Invalid calendar')
        if (!disposed) setData(result)
      })
      .catch(() => {
        if (!disposed) setError(true)
      })
      .finally(() => window.clearTimeout(timeout))
    return () => {
      disposed = true
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [platform, attempt])
  return (
    <section
      className={`activity-card activity-${platform}`}
      aria-labelledby={`${platform}-title`}
    >
      <div className="activity-header">
        <div className="activity-identity">
          <span className="platform-mark" aria-hidden="true">
            {platform === 'github' ? '⌘' : '〈/〉'}
          </span>
          <div>
            <h3 id={`${platform}-title`}>{label}</h3>
            <p>
              {platform === 'github' ? '@amey1234444' : '@amey_bhagwatkar_07'}
            </p>
          </div>
        </div>
        <a
          href={profile[platform]}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${label} profile`}
        >
          <Arrow diagonal />
        </a>
      </div>
      {error ? (
        <div className="activity-fallback" role="status">
          <p>The calendar couldn&apos;t load right now.</p>
          <span>Your profile is still one click away.</span>
          <button type="button" onClick={() => setAttempt(attempt + 1)}>
            Retry {label} calendar ↻
          </button>
        </div>
      ) : !data ? (
        <div className="activity-loading" role="status">
          <div className="calendar-skeleton" aria-hidden="true" />
          <span>Loading {label} activity…</span>
        </div>
      ) : (
        <>
          <div className="activity-stats">
            <div>
              <strong>{data.total.toLocaleString('en-US')}</strong>
              <span>
                {platform === 'github' ? 'contributions' : 'submissions'}
              </span>
            </div>
            <div>
              <strong>{data.activeDays}</strong>
              <span>active days</span>
            </div>
            <div>
              <strong>
                {platform === 'leetcode' && data.solved !== undefined
                  ? data.solved.toLocaleString('en-US')
                  : data.longestStreak}
              </strong>
              <span>
                {platform === 'leetcode' && data.solved !== undefined
                  ? 'problems solved · all time'
                  : 'day longest streak'}
              </span>
            </div>
          </div>
          <Heatmap data={data} platform={platform} />
          <div className="activity-source">
            <span>LAST 365 DAYS · UTC</span>
            <span>
              Source: {data.source} · fetched{' '}
              {new Date(data.updatedAt).toLocaleDateString('en-GB', {
                timeZone: 'UTC',
              })}
            </span>
          </div>
        </>
      )}
    </section>
  )
}
export default function ActivitySection() {
  return (
    <section
      className="container studio-section activity-section"
      id="activity"
    >
      <SectionHeading
        number="03"
        label="SMALL STEPS, EVERY DAY"
        title={
          <>
            The work behind
            <br />
            <span className="serif">the work.</span>
          </>
        }
      >
        <p className="activity-intro">
          Commits, practice, and plenty of debugging.
          <br />A live look at where I spend my time.
        </p>
      </SectionHeading>
      <div className="activity-grid">
        <ActivityCard platform="github" />
        <ActivityCard platform="leetcode" />
      </div>
      <p className="activity-footnote">
        GitHub contributions and LeetCode submissions measure different
        activity. Hover, tap, or use arrow keys to explore each calendar.
      </p>
    </section>
  )
}
