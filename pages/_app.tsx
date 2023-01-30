//General
import {
  ColorScheme,
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
} from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import theme from 'theme'

//Contexts
import { NotificationsProvider } from '@mantine/notifications'
import { SessionProvider } from 'next-auth/react'

//Components
import ErrorBoundary from 'components/shared/ErrorBoundary'
import LoadingScreen from 'components/shared/LoadingScreen'
import NavigationProgress from 'components/shared/NavigationProgress'

//Types
import type { NextPage } from 'next'
import type { Session } from 'next-auth'
import type { ReactElement, ReactNode } from 'react'

//Styles
import { useColorScheme } from '@mantine/hooks'
import '../styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}

// Client-side cache, shared for the whole session of the user in the browser.
const emotionCache = createEmotionCache({ key: 'mantine' })

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout<{ session: Session }>) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const [loading, setLoading] = useState(false)

  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    //setLoading(true);
    setTimeout(() => setLoading(true), 1000)
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <title>Prode F1 Banco Provincia</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="description" content="F1 Prode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            withCSSVariables
            emotionCache={emotionCache}
            theme={theme}
          >
            <NotificationsProvider>
              {loading ? (
                getLayout(
                  <>
                    <NavigationProgress />
                    <ErrorBoundary>
                      <Component {...pageProps} />
                    </ErrorBoundary>
                  </>
                )
              ) : (
                <LoadingScreen color="#F5F7F9" />
              )}
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
    </>
  )
}
