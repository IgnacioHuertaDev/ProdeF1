import {
  Affix,
  AppShell,
  Button,
  MantineTheme,
  Transition,
} from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { IconArrowUp } from '@tabler/icons'
import HeaderMinimal from 'components/shared/HeaderMinimal'
import NavbarMinimal from 'components/shared/NavbarMinimal'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
// dayjs.tz.setDefault('America/Argentina/Buenos_Aires')
dayjs.locale('es')

interface DashboardLayoutProps {
  children?: JSX.Element
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [opened, setOpened] = useState(false)
  const router = useRouter()
  const [scroll, scrollTo] = useWindowScroll()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    router.push('/auth')
  }

  return (
    <>
      <AppShell
        navbar={<NavbarMinimal opened={opened} setOpened={setOpened} />}
        header={<HeaderMinimal opened={opened} setOpened={setOpened} />}
        fixed
        navbarOffsetBreakpoint="sm"
        styles={(theme: MantineTheme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
      {/* Scroll To top Button */}
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size={16} />}
              color="gray"
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Volver arriba
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  )
}

export default DashboardLayout
