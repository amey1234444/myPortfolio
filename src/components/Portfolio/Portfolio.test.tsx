import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { ReactNode } from 'react'

import Projects from '../../pages/projects'
import Tools from '../../pages/tools'
import Layout from '../Layout/Layout'

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/', asPath: '/' }),
}))

function renderPage(children: ReactNode) {
  return render(
    <ColorSchemeProvider colorScheme="dark" toggleColorScheme={jest.fn()}>
      <MantineProvider>{children}</MantineProvider>
    </ColorSchemeProvider>
  )
}

describe('Portfolio interactions', () => {
  beforeEach(() => window.localStorage.clear())
  it('filters projects by category and can return to the full collection', () => {
    renderPage(<Projects />)
    expect(screen.getAllByRole('article')).toHaveLength(6)
    const filters = screen.getByRole('group', { name: 'Filter projects' })
    fireEvent.click(within(filters).getByRole('button', { name: /AI & data/ }))
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(
      screen.getByRole('heading', { name: 'Facial Emotion Detection' })
    ).toBeVisible()
    expect(
      screen.queryByRole('heading', { name: 'ArtistHub' })
    ).not.toBeInTheDocument()
    fireEvent.click(
      within(filters).getByRole('button', { name: /All projects/ })
    )
    expect(screen.getAllByRole('article')).toHaveLength(6)
  })
  it('shows an empty search state and restores the tools when cleared', () => {
    renderPage(<Tools />)
    fireEvent.change(screen.getByRole('searchbox', { name: 'Find a tool' }), {
      target: { value: 'does-not-exist' },
    })
    expect(
      screen.getByRole('heading', { name: 'No tools found.' })
    ).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(
      screen.getByRole('heading', { name: 'Visual Studio Code' })
    ).toBeVisible()
  })
  it('persists the motion preference and provides a clipboard failure fallback', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn().mockRejectedValue(new Error('denied')) },
    })
    renderPage(
      <Layout>
        <h1>Test page</h1>
      </Layout>
    )
    fireEvent.click(screen.getByRole('button', { name: /Pause animations/ }))
    expect(
      screen.getByRole('button', { name: /Play animations/ })
    ).toHaveAttribute('aria-pressed', 'true')
    expect(window.localStorage.getItem('portfolio-motion')).toBe('paused')
    fireEvent.click(screen.getByRole('button', { name: 'Copy email' }))
    expect(
      await screen.findByRole('button', {
        name: 'Please select the email to copy',
      })
    ).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'ameybhagwatkar01@gmail.com' })
    ).toHaveAttribute('href', 'mailto:ameybhagwatkar01@gmail.com')
  })
})
