const DAY = 86400000

/** Build an inclusive UTC window ending today, including leap days. */
export function calendarWindow(now = new Date(), length = 365) {
  const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  return Array.from({ length }, (_, index) =>
    new Date(end - (length - 1 - index) * DAY).toISOString().slice(0, 10)
  )
}

/** Missing submission days are zero only after a valid provider response. */
export function normalizeCalendar(counts, dates) {
  return dates.map((date) => {
    const count = counts[date] === undefined ? 0 : counts[date]
    if (!Number.isSafeInteger(count) || count < 0) {
      throw new Error('Invalid activity count')
    }
    return { date, count, level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4 }
  })
}

export function submissionCounts(calendars) {
  /** @type {Record<string, number>} */
  const counts = {}
  calendars.forEach((calendar) => {
    const parsed = typeof calendar === 'string' ? JSON.parse(calendar) : calendar
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Invalid submission calendar')
    }
    Object.entries(parsed).forEach(([timestamp, count]) => {
      const date = new Date(Number(timestamp) * 1000)
      if (!Number.isFinite(date.getTime()) || !Number.isSafeInteger(count) || Number(count) < 0) {
        throw new Error('Invalid submission entry')
      }
      const key = date.toISOString().slice(0, 10)
      // Calendars may overlap at year boundaries. Never double-count a day.
      counts[key] = Math.max(counts[key] || 0, Number(count))
    })
  })
  return counts
}

export function calendarSummary(days) {
  let longestStreak = 0
  let streak = 0
  days.forEach((day) => {
    streak = day.count > 0 ? streak + 1 : 0
    longestStreak = Math.max(longestStreak, streak)
  })
  return {
    total: days.reduce((sum, day) => sum + day.count, 0),
    activeDays: days.filter((day) => day.count > 0).length,
    longestStreak,
  }
}
