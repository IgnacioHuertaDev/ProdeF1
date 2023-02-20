import {
  Affix,
  AppShell,
  Button,
  MantineTheme,
  Transition,
} from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { IconArrowUp } from '@tabler/icons'
import ErrorMessage from 'components/shared/ErrorMessage'
import HeaderMinimal from 'components/shared/HeaderMinimal'
import NavbarMinimal from 'components/shared/NavbarMinimal'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
    return (
      <ErrorMessage
        message="Acceso denegado, debe ingresar primero."
        showButton={false}
      />
    )
  }

  return (
    <>
      <AppShell
        navbar={<NavbarMinimal opened={opened} />}
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
