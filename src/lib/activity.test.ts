import {
  activitySummary,
  calendarDays,
  parseSubmissionCalendar,
} from './activity'

describe('Activity calendars', () => {
  it('keeps exactly 365 UTC dates, including leap day and today', () => {
    const days = calendarDays({}, new Date('2024-03-01T00:30:00Z'))
    expect(days).toHaveLength(365)
    expect(days[363].date).toBe('2024-02-29')
    expect(days[364].date).toBe('2024-03-01')
  })
  it('keeps unavailable GitHub days distinct from zero activity', () => {
    const days = calendarDays(
      { '2026-10-08': 4 },
      new Date('2026-10-08T12:00:00Z'),
      null
    )
    expect(days[0].count).toBeNull()
    expect(days[364].count).toBe(4)
  })
  it('counts active days and resets streaks across gaps', () => {
    expect(
      activitySummary(
        [2, 1, 0, 5, 1, 1, null].map((count, i) => ({ date: String(i), count }))
      )
    ).toEqual({ total: 10, activeDays: 5, longestStreak: 3 })
  })
  it('parses UTC submission timestamps and rejects malformed provider data', () => {
    expect(parseSubmissionCalendar('{"1709164800":3}')).toEqual({
      '2024-02-29': 3,
    })
    expect(() => parseSubmissionCalendar('{"bad":3}')).toThrow()
    expect(() => parseSubmissionCalendar('{"1709164800":-1}')).toThrow()
  })
})
