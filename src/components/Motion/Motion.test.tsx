import { act, fireEvent, render, screen } from '@testing-library/react'

import ColourHero from './ColourHero'
import { MotionContext } from './MotionContext'
import SkillOrbit from './SkillOrbit'

describe('Colour and motion controls', () => {
  afterEach(() => jest.useRealTimers())
  it('advances automatically, then stops after a visitor chooses a slide', () => {
    jest.useFakeTimers()
    render(
      <MotionContext.Provider
        value={{ paused: false, reduced: false, toggleMotion: jest.fn() }}
      >
        <ColourHero />
      </MotionContext.Provider>
    )
    act(() => {
      jest.advanceTimersByTime(7500)
    })
    expect(
      screen.getByRole('heading', { name: 'Ideas into images' })
    ).toBeVisible()
    fireEvent.click(
      screen.getByRole('button', { name: 'Show Make it connect' })
    )
    act(() => {
      jest.advanceTimersByTime(16000)
    })
    expect(
      screen.getByRole('heading', { name: 'Make it connect' })
    ).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'Explore GRID-X' })
    ).toHaveAttribute('href', '/projects/8')
  })
  it('keeps the first slide still with reduced motion while allowing manual navigation', () => {
    jest.useFakeTimers()
    render(<ColourHero />)
    act(() => {
      jest.advanceTimersByTime(16000)
    })
    expect(screen.getByRole('heading', { name: "Hi, I'm Amey" })).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }))
    expect(
      screen.getByRole('heading', { name: 'Find the signal' })
    ).toBeVisible()
  })
  it('makes the skills available through ordinary buttons', () => {
    render(<SkillOrbit />)
    fireEvent.click(screen.getByRole('button', { name: 'Backend' }))
    expect(
      screen.getByRole('heading', {
        name: 'Java · Spring Boot · Node.js · NestJS',
      })
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Backend' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })
})
