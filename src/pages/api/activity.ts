import type { NextApiRequest, NextApiResponse } from 'next'
import { calendarWindow, normalizeCalendar, submissionCounts, calendarSummary } from '../../lib/activity-calendar'

async function getJson(url: string, init: RequestInit = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 7500)
  try {
    const response = await fetch(url, { ...init, signal: controller.signal })
    if (!response.ok) throw new Error('Activity provider unavailable')
    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Use GET' })
  }
  const provider = req.query.provider
  if (provider !== 'github' && provider !== 'leetcode') {
    return res.status(400).json({ error: 'Unknown activity provider' })
  }
  try {
    const dates = calendarWindow()
    const years = Array.from(new Set(dates.map((date) => date.slice(0, 4))))
    let counts: Record<string, number>
    if (provider === 'github') {
      const query = years.map((year) => 'y=' + year).join('&')
      const result = await getJson('https://github-contributions-api.jogruber.de/v4/amey1234444?' + query)
      if (!Array.isArray(result.contributions) || result.contributions.length === 0) throw new Error('Missing calendar')
      counts = {}
      result.contributions.forEach((day: { date: string; count: number }) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isSafeInteger(day.count) || day.count < 0) throw new Error('Invalid calendar')
        counts[day.date] = day.count
      })
      // An incomplete response must never become a misleading empty calendar.
      if (dates.some((date) => counts[date] === undefined)) throw new Error('Incomplete calendar')
    } else {
      const calendars = await Promise.all(years.map(async (year) => {
        const result = await getJson('https://leetcode.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: 'query Calendar($username: String!, $year: Int!) { matchedUser(username: $username) { userCalendar(year: $year) { submissionCalendar } } }',
            variables: { username: 'amey_bhagwatkar_07', year: Number(year) },
          }),
        })
        const calendar = result.data?.matchedUser?.userCalendar?.submissionCalendar
        if (result.errors?.length || typeof calendar !== 'string') throw new Error('Missing calendar')
        return calendar
      }))
      counts = submissionCounts(calendars)
    }
    const days = normalizeCalendar(counts, dates)
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600')
    return res.status(200).json({
      provider,
      days,
      ...calendarSummary(days),
      fetchedAt: new Date().toISOString(),
      source: provider === 'github' ? 'GitHub via GitHub Contributions API' : 'LeetCode',
    })
  } catch {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(502).json({ error: 'Activity is temporarily unavailable. Please try again.' })
  }
}
