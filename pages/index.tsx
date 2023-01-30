import { Box, SimpleGrid } from '@mantine/core'
import ConstructorsStanding from 'components/dashboard/ConstructorsStanding'
import DriversStanding from 'components/dashboard/DriversStanding'
import RankingTable from 'components/dashboard/RankingTable'
import DashboardLayout from 'layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { ReactElement } from 'react'
import { currencyFormatter } from 'utils/currencyFormatter'

const Home = () => {
  const { status } = useSession()
  const loading = status === 'loading'

  const data = [
    {
      title: 'Proyectos unicos',
      icon: 'receipt' as const,
      value: '5',
      diff: 0.5,
    },
    {
      title: 'Clientes',
      icon: 'receipt' as const,
      value: '4',
      diff: 0.5,
    },
    {
      title: 'Ingreso mensual',
      icon: 'receipt' as const,
      value: currencyFormatter.format(parseFloat('10')).toString(),
      diff: 0.5,
    },
    {
      title: 'Ingreso total',
      icon: 'receipt' as const,
      value: currencyFormatter.format(1200).toString(),
      diff: 0.5,
    },
  ]

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  return (
    <>
      {/* <MainStats data={data} /> */}
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl * 1.5,
        })}
      >
        <RankingTable title="Ranking general" data={[]} />
        <SimpleGrid
          mt={100}
          cols={2}
          breakpoints={[{ maxWidth: 'lg', cols: 1 }]}
        >
          <DriversStanding />
          <ConstructorsStanding />
        </SimpleGrid>
      </Box>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

// export async function getServerSideProps() {

// }

export default Home
