import type { NextApiRequest, NextApiResponse } from 'next'

import { normalizeLeetCodeBadges } from '../../lib/badges'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Use GET.' })
  }
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query PortfolioBadges($username: String!) {
          matchedUser(username: $username) {
            badges { id name displayName icon hoverText creationDate }
          }
        }`,
        variables: { username: 'amey_bhagwatkar_07' },
      }),
    })
    if (!response.ok) throw new Error('Unavailable')
    const badges = normalizeLeetCodeBadges(await response.json())
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    )
    return res
      .status(200)
      .json({ badges, verifiedAt: new Date().toISOString().slice(0, 10) })
  } catch {
    res.setHeader('Cache-Control', 'no-store')
    return res
      .status(502)
      .json({
        error:
          'Live badges unavailable. The verified collection is still available.',
      })
  } finally {
    clearTimeout(timeout)
  }
}
