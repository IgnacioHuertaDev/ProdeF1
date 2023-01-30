import {
  createStyles,
  Group,
  Navbar,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEventHandler, useState } from 'react'
import {
  CalendarEvent,
  Home2,
  Icon,
  Login,
  Logout,
  MoonStars,
  Sun,
  Ticket,
} from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },
}))

const mockdata = [
  { Icon: Home2, label: 'Home', page: '' },
  { Icon: CalendarEvent, label: 'Calendario', page: 'calendar' },
  { Icon: Ticket, label: 'Prode', page: 'prode' },
]

interface NavbarLinkProps {
  icon: Icon
  label: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
  page: string
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  page,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <Link href={`/${page}`} passHref>
        <UnstyledButton
          component="a"
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: active })}
        >
          <Icon />
        </UnstyledButton>
      </Link>
    </Tooltip>
  )
}

interface NavbarButtonProps {
  icon: Icon
  label: string
  active?: boolean
  onClick: MouseEventHandler<HTMLAnchorElement>
}

function NavbarButton({
  icon: Icon,
  label,
  active,
  onClick,
}: NavbarButtonProps) {
  const { classes, cx } = useStyles()
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton
        component="a"
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  )
}

interface NavbarMinimalProps {
  opened: boolean
}

const NavbarMinimal = ({ opened }: NavbarMinimalProps) => {
  const router = useRouter()
  const [active, setActive] = useState(router.pathname)

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const links = mockdata.map((link, index) => {
    const { Icon, label, page } = link
    router
    return (
      <NavbarLink
        icon={Icon}
        label={label}
        key={index}
        active={router.pathname === `/${page}`}
        onClick={() => setActive(router.pathname)}
        page={page}
      ></NavbarLink>
    )
  })

  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      height="100vh"
      width={{ base: 80 }}
      p="md"
    >
      <Navbar.Section grow mt={0}>
        <Group align="center" spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section mb={120}>
        <Group align="center" spacing={0}>
          <NavbarButton
            icon={colorScheme === 'dark' ? Sun : MoonStars}
            label="Change theme"
            onClick={() => toggleColorScheme()}
          />
          {!session && (
            <NavbarButton
              icon={Login}
              label="Log In"
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            />
          )}
          {session?.user && (
            <NavbarButton
              icon={Logout}
              label="Logout"
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
            />
          )}
        </Group>
      </Navbar.Section>
    </Navbar>
  )
}

export default NavbarMinimal
