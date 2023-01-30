import { createStyles, Table, Title } from '@mantine/core'
import {
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus,
} from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  categoryCard: {
    height: 160,
    position: 'relative',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    color: theme.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    overflow: 'hidden',
    transition: 'background-size 300ms ease',

    '&:hover': {
      backgroundSize: '105%',
    },
  },

  categoryLabel: {
    color: theme.white,
    zIndex: 2,
    position: 'relative',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}))

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
}

interface EchiPageStatsProps {
  title: string
  data: RankingProps[] | []
}

interface RankingProps {
  position: number
  points: number
  name: string
}

export default function RankingTable({ title, data }: EchiPageStatsProps) {
  const { classes } = useStyles()

  let rows = null

  if (data.length > 0) {
    rows = data.map((item) => (
      <tr key={item.name}>
        <td>{item.position}</td>
        <td>{item.name}</td>
        <td>{item.points}</td>
      </tr>
    ))
  }

  return (
    <>
      <div>
        <Title order={1} mb={15}>
          {title}
        </Title>
        <Table>
          <thead>
            <tr>
              <th>Posición</th>
              <th>Nombre</th>
              <th>Puntos</th>
            </tr>
          </thead>
          {rows !== null ? <tbody>{rows}</tbody> : null}
        </Table>
      </div>
    </>
  )
}
