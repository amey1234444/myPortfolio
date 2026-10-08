import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { fireEvent, render, screen, within } from '@testing-library/react'

import { navigation } from '../../routes/navigation'
import Header from './Header'

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/', asPath: '/' }),
}))

function renderHeader() {
  return render(
    <ColorSchemeProvider colorScheme="dark" toggleColorScheme={jest.fn()}>
      <MantineProvider>
        <Header links={navigation} />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

describe('Portfolio navigation', () => {
  it('marks the current page and links the brand to home', () => {
    renderHeader()
    expect(
      screen.getByRole('link', { name: 'Amey Bhagwatkar home' })
    ).toHaveAttribute('href', '/')
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })
  it('opens the mobile menu, then closes on Escape and restores focus', () => {
    renderHeader()
    const trigger = screen.getByRole('button', { name: 'Open navigation' })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('navigation', { name: 'Mobile navigation' })
    ).toBeVisible()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveFocus()
  })
})
