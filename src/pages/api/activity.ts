import type { NextApiRequest, NextApiResponse } from 'next'

import {
  activitySummary,
  calendarDays,
  parseSubmissionCalendar,
} from '../../lib/activity'

async function requestJson(url: string, init: RequestInit = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  try {
    const response = await fetch(url, { ...init, signal: controller.signal })
    if (!response.ok) throw new Error('Activity provider unavailable')
    return await response.json()
  } finally {
    clearTimeout(timeout)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Use GET.' })
  }
  const { platform } = req.query
  if (platform !== 'github' && platform !== 'leetcode') return res.status(400).json({ error: 'Choose github or leetcode.' })
  try {
    const now = new Date()
    let counts: Record<string, number> = {}
    let solved: number | undefined
    if (platform === 'github') {
      const data = await requestJson(
        'https://github-contributions-api.jogruber.de/v4/amey1234444?y=last'
      )
      if (!Array.isArray(data.contributions) || data.contributions.length === 0) throw new Error('Missing calendar')
      data.contributions.forEach((day: { date: string; count: number }) => {
        if (
          !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
          !Number.isInteger(day.count) ||
          day.count < 0
        ) throw new Error('Invalid contribution')
        counts[day.date] = day.count
      })
    } else {
      const data = await requestJson('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query PortfolioActivity($username: String!, $year: Int!, $previous: Int!) {
          matchedUser(username: $username) {
            current: userCalendar(year: $year) { submissionCalendar }
            previous: userCalendar(year: $previous) { submissionCalendar }
            submitStatsGlobal { acSubmissionNum { difficulty count } }
          }
        }`,
          variables: {
            username: 'amey_bhagwatkar_07',
            year: now.getUTCFullYear(),
            previous: now.getUTCFullYear() - 1,
          },
        }),
      })
      const user = data.data?.matchedUser
      if (
        data.errors?.length ||
        !user ||
        typeof user.current?.submissionCalendar !== 'string' ||
        typeof user.previous?.submissionCalendar !== 'string'
      ) throw new Error('Missing calendar')
      counts = {
        ...parseSubmissionCalendar(user.previous.submissionCalendar),
        ...parseSubmissionCalendar(user.current.submissionCalendar),
      }
      const all = user.submitStatsGlobal?.acSubmissionNum?.find(
        (item: { difficulty: string; count: number }) =>
          item.difficulty === 'All'
      )
      if (Number.isInteger(all?.count) && all.count >= 0) solved = all.count
    }
    const days = calendarDays(counts, now, platform === 'github' ? null : 0)
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1800, stale-while-revalidate=3600'
    )
    return res.status(200).json({
      days,
      ...activitySummary(days),
      solved,
      updatedAt: now.toISOString(),
      source:
        platform === 'github'
          ? 'GitHub Contributions API by JoGruber'
          : 'LeetCode',
    })
  } catch {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(502).json({
      error:
        'Activity is temporarily unavailable. Please retry or visit the profile.',
    })
  }
}
