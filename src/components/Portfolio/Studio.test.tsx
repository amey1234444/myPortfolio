import { fireEvent, render, screen, within } from '@testing-library/react'
import { Workbench, AboutCards } from './Studio'
import Activity from './Activity'
import { calendarWindow } from '../../lib/activity-calendar'

describe('Studio interactions', () => {
  it('changes disciplines using keyboard tabs and shows the matching panel', () => {
    render(<Workbench />)
    const web = screen.getByRole('tab', { name: /Web/ })
    web.focus()
    fireEvent.keyDown(web, { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: /Systems/ })).toHaveFocus()
    expect(screen.getByRole('tab', { name: /Systems/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Good interfaces need solid foundations.')).toBeVisible()
  })
  it('wraps the principles carousel and changes the introduction command', () => {
    render(<AboutCards />)
    fireEvent.click(screen.getByRole('button', { name: 'Previous principle' }))
    expect(screen.getByRole('heading', { name: 'Stay a student.' })).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'Next principle' }))
    expect(screen.getByRole('heading', { name: 'Start with why.' })).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'location' }))
    expect(screen.getByText(/18.5204/)).toBeVisible()
  })
  it('retries a failed provider and supports week-by-week keyboard navigation', async () => {
    const original = global.fetch
    const days = calendarWindow(new Date('2026-10-08T12:00:00Z')).map((date) => ({ date, count: 0, level: 0 }))
    const payload = { days, total: 0, activeDays: 0, longestStreak: 0, fetchedAt: '2026-10-08T12:00:00Z', source: 'Test fixture' }
    let githubAttempts = 0
    global.fetch = jest.fn(async (url) => {
      const github = String(url).includes('github')
      if (github) githubAttempts += 1
      return { ok: !github || githubAttempts > 1, json: async () => payload } as Response
    })
    try {
      render(<Activity />)
      expect(await screen.findByText("Couldn't load GitHub activity.")).toBeVisible()
      fireEvent.click(screen.getByRole('button', { name: /Try again/ }))
      const calendar = await screen.findByRole('group', { name: 'GitHub daily activity' })
      const buttons = within(calendar).getAllByRole('button')
      expect(buttons).toHaveLength(365)
      buttons[364].focus()
      fireEvent.keyDown(buttons[364], { key: 'ArrowLeft' })
      expect(buttons[357]).toHaveFocus()
      expect(githubAttempts).toBe(2)
    } finally {
      global.fetch = original
    }
  })
})
