import {
  Burger,
  Group,
  Header,
  MediaQuery,
  Title,
  useMantineTheme,
} from '@mantine/core'
import Image from 'next/image'
import FormulaLogo from 'public/assets/brandLogo.png'
import AvatarNav from '../AvatarNav'

interface HeaderMinimalProps {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderMinimal = ({ opened, setOpened }: HeaderMinimalProps) => {
  const theme = useMantineTheme()

  return (
    <Header height={70} p="md">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Group align="center" spacing={40}>
          <MediaQuery smallerThan={450} styles={{ display: 'none' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src={FormulaLogo}
                  alt="F1 Logo"
                  width="45"
                  height="45"
                  priority
                />
              </div>
            </div>
          </MediaQuery>
          <Title order={1}>Prode F1</Title>
        </Group>
        <Group align="end" spacing={40}>
          <AvatarNav />
        </Group>
      </div>
    </Header>
  )
}

export default HeaderMinimal
