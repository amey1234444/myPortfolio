import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { activitySummary, calendarDays } from '../../lib/activity'
import { ActivityCard } from './ActivitySection'
import { ValuesCard, Workbench } from './Studio'

describe('Studio interactions', () => {
  afterEach(() => jest.restoreAllMocks())
  it('switches workbench content without an automatic carousel', () => {
    render(<Workbench />)
    fireEvent.click(screen.getByRole('button', { name: 'Systems' }))
    expect(screen.getByText('server.ts')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Systems' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.queryByText('experience.tsx')).not.toBeInTheDocument()
  })
  it('cycles values in both directions', () => {
    render(<ValuesCard />)
    fireEvent.click(screen.getByRole('button', { name: 'Previous value' }))
    expect(
      screen.getByRole('heading', { name: /There is always/ })
    ).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'Next value' }))
    expect(screen.getByRole('heading', { name: /Make it work/ })).toBeVisible()
  })
  it('shows a retry instead of a fabricated empty calendar, then supports keyboard exploration', async () => {
    const days = calendarDays(
      { '2026-10-08': 4 },
      new Date('2026-10-08T12:00:00Z')
    )
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          days,
          ...activitySummary(days),
          updatedAt: '2026-10-08T12:00:00Z',
          source: 'GitHub',
        }),
      })
    render(<ActivityCard platform="github" />)
    expect(
      await screen.findByText("The calendar couldn't load right now.")
    ).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: /Retry GitHub/ }))
    const today = await screen.findByRole('button', {
      name: '2026-10-08: 4 contributions',
    })
    fireEvent.keyDown(today, { key: 'ArrowLeft' })
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: '2026-10-01: 0 contributions' })
      ).toHaveFocus()
    )
    expect(
      screen.getAllByRole('button').filter((button) => button.tabIndex === 0)
    ).toHaveLength(1)
  })
})
