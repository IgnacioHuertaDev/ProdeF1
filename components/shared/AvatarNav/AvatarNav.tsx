import {
  Avatar,
  Group,
  MediaQuery,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { useFullscreen } from '@mantine/hooks'
import { NextLink } from '@mantine/next'
import { IconChevronRight } from '@tabler/icons'
import { signOut, useSession } from 'next-auth/react'
import { forwardRef } from 'react'
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { IoMdPower } from 'react-icons/io'

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image?: React.ReactNode
  name: string
  email: string
  icon?: React.ReactNode
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      aria-label=""
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.sm,
        margin: theme.spacing.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        borderRadius: theme.radius.lg,

        '&:hover': {
          backgroundColor: theme.fn.darken(theme.colors.dark[6], 0.6),
        },
      })}
      {...others}
    >
      <Group>
        {image ? (
          <Avatar color="mainBrand" variant="outline" radius="xl">
            {image}
          </Avatar>
        ) : (
          <Avatar radius="xl" />
        )}

        <MediaQuery query="(max-width: 910px)" styles={{ display: 'none' }}>
          <Group>
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500} color={'white'}>
                {name}
              </Text>

              <Text color={'white'} size="xs">
                {email}
              </Text>
            </div>
            {icon || <IconChevronRight color="white" size={16} />}
          </Group>
        </MediaQuery>
      </Group>
    </UnstyledButton>
  )
)
//Ref: https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref
UserButton.displayName = 'UserButton'

export default function AvatarNav() {
  const { toggle, fullscreen } = useFullscreen()

  const { data: session, status } = useSession()
  const loading = status === 'loading'

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  return (
    <Group position="center">
      <Menu position="bottom-end" withArrow>
        <Menu.Target>
          <UserButton
            image={<BsFillPersonFill color="white" size="25" />}
            name={session ? session.user!.name! : 'Not logged'}
            email={session ? session.user!.email! : 'Not logged'}
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            component={NextLink}
            href="/profile"
            icon={<BsFillPersonFill size={14} />}
          >
            Mis datos
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={toggle}
            icon={
              fullscreen ? (
                <AiOutlineFullscreenExit size={14} />
              ) : (
                <AiOutlineFullscreen size={14} />
              )
            }
          >
            {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            component="button"
            color="red.4"
            icon={<IoMdPower size={14} />}
            onClick={(e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault()
              signOut()
            }}
          >
            Cerrar sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
