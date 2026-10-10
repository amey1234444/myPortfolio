export interface ActivityDay {
  date: string
  count: number | null
}
export interface ActivityData {
  days: ActivityDay[]
  total: number
  activeDays: number
  longestStreak: number
  updatedAt: string
  source: string
  solved?: number
}

// UTC keys avoid a contribution drifting to the preceding day in another timezone.
export function calendarDays(
  counts: Record<string, number>,
  now = new Date(),
  missing: number | null = 0
): ActivityDay[] {
  const end = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  )
  return Array.from({ length: 365 }, (_, i) => {
    const date = new Date(end - (364 - i) * 86400000).toISOString().slice(0, 10)
    return {
      date,
      count: Object.prototype.hasOwnProperty.call(counts, date)
        ? counts[date]
        : missing,
    }
  })
}
export function activitySummary(days: ActivityDay[]) {
  let streak = 0
  let longestStreak = 0
  let total = 0
  let activeDays = 0
  days.forEach(({ count }) => {
    total += count || 0
    if (count && count > 0) {
      streak += 1
      activeDays += 1
      longestStreak = Math.max(longestStreak, streak)
    } else streak = 0
  })
  return { total, activeDays, longestStreak }
}
export function parseSubmissionCalendar(raw: string): Record<string, number> {
  const source = JSON.parse(raw)
  if (!source || typeof source !== 'object' || Array.isArray(source)) throw new Error('Invalid calendar')
  const result: Record<string, number> = {}
  Object.entries(source).forEach(([timestamp, value]) => {
    const date = new Date(Number(timestamp) * 1000)
    if (
      !/^\d+$/.test(timestamp) ||
      !Number.isFinite(date.getTime()) ||
      typeof value !== 'number' ||
      !Number.isInteger(value) ||
      value < 0
    ) throw new Error('Invalid activity day')
    result[date.toISOString().slice(0, 10)] = value
  })
  return result
}
