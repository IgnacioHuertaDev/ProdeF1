import { Box, Center, MediaQuery, SimpleGrid, Skeleton } from '@mantine/core'
import ConstructorsStanding from 'components/dashboard/ConstructorsStanding'
import DriversStanding from 'components/dashboard/DriversStanding'
import RankingTable from 'components/dashboard/RankingTable'
import ErrorMessage from 'components/shared/ErrorMessage'
import dashboardConfig from 'dashboardConfig'
import useGetProdeByYear from 'hooks/useGetProdeByYear'
import DashboardLayout from 'layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { ReactElement } from 'react'

const Home = () => {
  const { status } = useSession()
  const loading = status === 'loading'

  const { prode, isLoading, isError, isLoadingSlow } = useGetProdeByYear(
    dashboardConfig.currentYear
  )

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  if (isError)
    return (
      <ErrorMessage
        message="Ha ocurrido un error al obtener el los resultados"
        showButton={false}
      />
    )

  if (isLoading)
    return (
      <>
        <Center>
          <MediaQuery largerThan={935} styles={{ display: 'none' }}>
            <Skeleton height={215} width="100%" radius="md" />
          </MediaQuery>
          <MediaQuery smallerThan={935} styles={{ display: 'none' }}>
            <Skeleton height={215} width="65%" radius="md" />
          </MediaQuery>
        </Center>
        {isLoadingSlow && (
          <ErrorMessage
            message="El servidor esta demorando, aguarde..."
            showButton={false}
          />
        )}
      </>
    )

  interface RankingTable {
    points: number
    name: string
  }

  let data: RankingTable[] | [] = []
  if (prode !== undefined)
    data = prode.map((user) => {
      const points = user.predictions.reduce(
        (sum, prediction) => sum + prediction.puntaje,
        0
      )
      const name = user.usuario
      return { points, name }
    })

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl * 1.5,
        })}
      >
        <RankingTable title="Ranking general" data={data} withMedals />
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

export default Home
