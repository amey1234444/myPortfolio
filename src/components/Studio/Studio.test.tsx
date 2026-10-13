import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { activitySummary, calendarDays } from '../../lib/activity'
import Experience from '../Experience/Experience'
import { ActivityCard } from './ActivitySection'
import { ValuesCard } from './Studio'

describe('Studio interactions', () => {
  afterEach(() => jest.restoreAllMocks())
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

describe('Experience navigation', () => {
  it('supports arrow keys, Home and End while keeping one tab in the tab order', () => {
    render(<Experience />)
    const first = screen.getByRole('tab', { name: /BlackRock/ })
    fireEvent.keyDown(first, { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: /Intangles/ })).toHaveFocus()
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName(/Intangles/)
    fireEvent.keyDown(screen.getByRole('tab', { name: /Intangles/ }), {
      key: 'End',
    })
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName(
      /Persistent Systems/
    )
    fireEvent.keyDown(screen.getByRole('tab', { name: /Persistent Systems/ }), {
      key: 'Home',
    })
    expect(first).toHaveFocus()
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName(/BlackRock/)
    expect(
      screen.getAllByRole('tab').filter((tab) => tab.tabIndex === 0)
    ).toHaveLength(1)
  })
  it('wraps previous and next controls and announces the selected experience', () => {
    render(<Experience />)
    fireEvent.click(screen.getByRole('button', { name: 'Previous experience' }))
    expect(screen.getByRole('status')).toHaveTextContent(
      'Showing Persistent Systems'
    )
    fireEvent.click(screen.getByRole('button', { name: 'Next experience' }))
    expect(screen.getByRole('status')).toHaveTextContent('Showing BlackRock')
    expect(
      screen.getByRole('heading', { name: 'Secure, repeatable releases' })
    ).toBeVisible()
  })
})
