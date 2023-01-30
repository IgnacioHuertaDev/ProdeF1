import { createStyles, Group, Paper, SimpleGrid, Text } from '@mantine/core'
import { IconGps } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}))

const icons = {
  gps: IconGps,
}

interface RaceInfoProps {
  data: {
    title: string
    icon: keyof typeof icons
    raceName: string
    date: string
  }[]
}

const RaceInfo = ({ data }: RaceInfoProps) => {
  const { classes } = useStyles()
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon]

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size={22} stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.raceName}</Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7}>
          Fecha: {stat.date}
        </Text>
      </Paper>
    )
  })
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={2}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  )
}

export default RaceInfo
