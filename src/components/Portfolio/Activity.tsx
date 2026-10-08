import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/portfolio'
import { Arrow, SectionHeading } from './Elements'

interface Day { date: string; count: number; level: number }
interface ActivityData {
  days: Day[]
  total: number
  activeDays: number
  longestStreak: number
  fetchedAt: string
  source: string
}
const dateLabel = (date: string) => new Date(date + 'T00:00:00Z').toLocaleDateString('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
})

function Calendar({ provider }: { provider: 'github' | 'leetcode' }) {
  const [data, setData] = useState<ActivityData | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [active, setActive] = useState(364)
  const buttons = useRef<Array<HTMLButtonElement | null>>([])
  const label = provider === 'github' ? 'GitHub' : 'LeetCode'
  const unit = provider === 'github' ? 'contributions' : 'submissions'
  const url = provider === 'github' ? profile.github : profile.leetcode

  useEffect(() => {
    const controller = new AbortController()
    let mounted = true
    setData(null)
    setError(false)
    const timer = window.setTimeout(() => controller.abort(), 12000)
    fetch('/api/activity?provider=' + provider, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unavailable')
        const result: ActivityData = await response.json()
        if (!Array.isArray(result.days) || result.days.length !== 365) throw new Error('Invalid calendar')
        if (mounted) { setData(result); setActive(result.days.length - 1) }
      })
      .catch(() => { if (mounted) setError(true) })
      .finally(() => window.clearTimeout(timer))
    return () => { mounted = false; controller.abort(); window.clearTimeout(timer) }
  }, [provider, attempt])

  const offset = data ? new Date(data.days[0].date + 'T00:00:00Z').getUTCDay() : 0
  const weeks = data ? Math.ceil((offset + data.days.length) / 7) : 53
  const focused = data?.days[active]
  return (
    <article className={'activity-card activity-' + provider}>
      <div className="activity-heading">
        <div className="activity-provider"><span aria-hidden="true">{provider === 'github' ? '⌘' : '</>'}</span><div><h3>{label}</h3><p>{provider === 'github' ? '@amey1234444' : '@amey_bhagwatkar_07'}</p></div></div>
        <a href={url} target="_blank" rel="noreferrer" className="circle-arrow" aria-label={'View Amey on ' + label}><Arrow diagonal /></a>
      </div>
      <div className="activity-body" aria-busy={!data && !error}>
        {error ? (
          <div className="activity-message" role="status">
            <p>Couldn&apos;t load {label} activity.</p>
            <span>Your profile is still one click away.</span>
            <button type="button" onClick={() => setAttempt((value) => value + 1)}>Try again <span aria-hidden="true">↻</span></button>
          </div>
        ) : !data ? (
          <div className="activity-loading" role="status"><div className="calendar-skeleton" aria-hidden="true" /><span>Loading {label} activity…</span></div>
        ) : (
          <>
            <div className="activity-stats"><p><strong>{data.total.toLocaleString('en-US')}</strong> {unit}</p><span><b>{data.activeDays}</b> active days</span><span><b>{data.longestStreak}</b> day best streak</span></div>
            <div className="calendar-scroll" role="group" aria-label={label + ' daily activity'}>
              <div className="calendar-inner" style={{ width: weeks * 15 + 28 }}>
                <div className="calendar-months" aria-hidden="true" style={{ gridTemplateColumns: 'repeat(' + weeks + ', 15px)' }}>
                  {data.days.map((day, index) => day.date.endsWith('-01') ? <span key={day.date} style={{ gridColumn: Math.floor((index + offset) / 7) + 1 }}>{new Date(day.date + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })}</span> : null)}
                </div>
                <div className="calendar-plot">
                  <div className="calendar-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
                  <div className="calendar-cells" style={{ gridTemplateColumns: 'repeat(' + weeks + ', 12px)' }}>
                    {Array.from({ length: offset }, (_, i) => <span className="calendar-pad" key={'pad-' + i} />)}
                    {data.days.map((day, index) => (
                      <button
                        type="button"
                        key={day.date}
                        ref={(element) => { buttons.current[index] = element }}
                        className={'calendar-day level-' + day.level}
                        tabIndex={active === index ? 0 : -1}
                        aria-label={dateLabel(day.date) + ': ' + day.count + ' ' + unit}
                        title={dateLabel(day.date) + ': ' + day.count + ' ' + unit}
                        onFocus={() => setActive(index)}
                        onClick={() => setActive(index)}
                        onKeyDown={(event) => {
                          const moves: Record<string, number> = { ArrowRight: 7, ArrowLeft: -7, ArrowDown: 1, ArrowUp: -1 }
                          let next = index
                          if (event.key === 'Home') next = 0
                          else if (event.key === 'End') next = data.days.length - 1
                          else if (event.key in moves) next = Math.max(0, Math.min(data.days.length - 1, index + moves[event.key]))
                          else return
                          event.preventDefault()
                          buttons.current[next]?.focus()
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="calendar-meta"><p role="status">{focused ? dateLabel(focused.date) + ' · ' + focused.count + ' ' + unit : 'Select a day'}</p><div className="calendar-legend" aria-label="Colour intensity increases with activity"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} className={'level-' + level} />)}<span>More</span></div></div>
            <p className="activity-footnote">365 days · UTC · Fetched {dateLabel(data.fetchedAt.slice(0, 10))}. {provider === 'github' ? 'GitHub via Contributions API; updates may be delayed.' : 'Submissions, not unique problems solved.'}</p>
            <span className="sr-only">Use arrow keys to explore days, or Home and End to jump to the first and last day.</span>
          </>
        )}
      </div>
    </article>
  )
}

export default function Activity() {
  return (
    <section className="activity-section container" id="activity">
      <SectionHeading number="03" label="SHOWING UP, DAY AFTER DAY" title={<>Small steps.<br /><span className="serif">A visible trail.</span></>}>
        <p className="section-aside">Building on GitHub.<br />Thinking on LeetCode.</p>
      </SectionHeading>
      <div className="activity-calendars"><Calendar provider="github" /><Calendar provider="leetcode" /></div>
      <div className="activity-profile-links"><a href={profile.codeforces} target="_blank" rel="noreferrer">Codeforces <Arrow diagonal /></a><a href={profile.geeksforgeeks} target="_blank" rel="noreferrer">GeeksforGeeks <Arrow diagonal /></a><a href={profile.codechef} target="_blank" rel="noreferrer">CodeChef <Arrow diagonal /></a></div>
    </section>
  )
}
