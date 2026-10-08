import { calendarWindow, normalizeCalendar, submissionCounts, calendarSummary } from './activity-calendar'

describe('Activity calendars', () => {
  it('uses an inclusive 365-day UTC window across year boundaries', () => {
    const dates = calendarWindow(new Date('2026-01-01T22:00:00Z'))
    expect(dates).toHaveLength(365)
    expect(new Set(dates).size).toBe(365)
    expect(dates[0]).toBe('2025-01-02')
    expect(dates[364]).toBe('2026-01-01')
    expect(calendarWindow(new Date('2026-01-01T00:15:00+05:30'), 1)).toEqual(['2025-12-31'])
  })
  it('preserves leap days', () => {
    expect(calendarWindow(new Date('2024-03-01T00:00:00Z'), 3)).toEqual(['2024-02-28', '2024-02-29', '2024-03-01'])
  })
  it('calculates totals and streaks without omitting inactive days', () => {
    const days = normalizeCalendar({ '2024-02-28': 2, '2024-03-01': 10 }, ['2024-02-28', '2024-02-29', '2024-03-01'])
    expect(days[1].count).toBe(0)
    expect(calendarSummary(days)).toEqual({ total: 12, activeDays: 2, longestStreak: 1 })
  })
  it('deduplicates overlapping provider calendars', () => {
    const timestamp = String(Date.parse('2026-01-01T00:00:00Z') / 1000)
    const payload = JSON.stringify({ [timestamp]: 5 })
    expect(submissionCounts([payload, payload])['2026-01-01']).toBe(5)
  })
  it.each([-1, 1.5, NaN, '5'])('rejects an invalid activity count: %s', (count) => {
    expect(() => normalizeCalendar({ '2026-01-01': count }, ['2026-01-01'])).toThrow()
  })
  it.each(['broken', 'null', '[]'])('rejects a malformed calendar: %s', (calendar) => {
    expect(() => submissionCounts([calendar])).toThrow()
  })
})
