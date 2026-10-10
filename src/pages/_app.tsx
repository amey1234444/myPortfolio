import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { TrackingHeadScript } from '@phntms/next-gtm'
import { Analytics } from '@vercel/analytics/react'
import { getCookie, setCookies } from 'cookies-next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { useEffect, useState } from 'react'

import GlobalStyles from '../components/GlobalStyles/GlobalStyles'
import Seo from '../components/Seo/Seo'
import Spotlight from '../components/Spotlight/Spotlight'
import '../styles/studio.css'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || ''

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')

  useEffect(() => {
    const saved = getCookie('mantine-color-scheme')
    if (saved === 'dark' || saved === 'light') setColorScheme(saved)
  }, [])

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
    setCookies('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  return (
    <>
      <Head>
        <meta name="theme-color" content="#f7f6f2" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics trackPageViews />
      )}
      {GA_TRACKING_ID && <TrackingHeadScript id={GA_TRACKING_ID} />}
      <Seo />
      <GlobalStyles />
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            fontFamily: 'Manrope, Arial, sans-serif',
            primaryColor: 'blue',
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <Spotlight>
              <Component {...pageProps} />
              <Analytics />
            </Spotlight>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
