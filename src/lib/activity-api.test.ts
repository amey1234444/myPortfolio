/** @jest-environment node */
import type { NextApiRequest, NextApiResponse } from 'next'

import handler from '../pages/api/activity'
import badgeHandler from '../pages/api/badges'
import { normalizeLeetCodeBadges } from './badges'

function response() {
  const res = { setHeader: jest.fn(), status: jest.fn(), json: jest.fn() }
  res.status.mockReturnValue(res)
  return res
}
describe('Activity API', () => {
  it('rejects unsupported methods and platforms before contacting a provider', async () => {
    const res = response()
    await handler(
      { method: 'POST', query: {} } as NextApiRequest,
      res as unknown as NextApiResponse
    )
    expect(res.status).toHaveBeenCalledWith(405)
    expect(res.setHeader).toHaveBeenCalledWith('Allow', 'GET')
    await handler(
      {
        method: 'GET',
        query: { platform: 'anything' },
      } as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    )
    expect(res.status).toHaveBeenCalledWith(400)
  })
  it('returns an uncached error for failed providers, not zero contributions', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false })
    const res = response()
    await handler(
      {
        method: 'GET',
        query: { platform: 'github' },
      } as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    )
    expect(res.status).toHaveBeenCalledWith(502)
    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-store')
    expect(res.json.mock.calls[0][0].days).toBeUndefined()
  })
})

describe('Badges API', () => {
  it('normalizes actual provider badge data and rejects untrusted image hosts', () => {
    const badge = {
      id: '1',
      name: 'Annual Badge',
      displayName: '100 Days Badge 2026',
      icon: '/static/badge.png',
      creationDate: '2026-10-07',
    }
    expect(
      normalizeLeetCodeBadges({ data: { matchedUser: { badges: [badge] } } })[0]
    ).toMatchObject({
      platform: 'leetcode',
      earned: '2026-10-07',
      icon: 'https://leetcode.com/static/badge.png',
    })
    expect(() =>
      normalizeLeetCodeBadges({
        data: {
          matchedUser: {
            badges: [{ ...badge, icon: 'https://example.org/fake.png' }],
          },
        },
      })
    ).toThrow('Invalid badge')
    expect(() => normalizeLeetCodeBadges({ errors: ['Unavailable'] })).toThrow(
      'Badges unavailable'
    )
  })
  it('returns a retryable error instead of claiming an empty earned collection', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false })
    const res = response()
    await badgeHandler(
      { method: 'GET' } as NextApiRequest,
      res as unknown as NextApiResponse
    )
    expect(res.status).toHaveBeenCalledWith(502)
    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-store')
  })
})
