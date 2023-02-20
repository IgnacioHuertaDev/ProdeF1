import { Center, CSSObject, MediaQuery, Skeleton } from '@mantine/core'
import RankingTable from 'components/dashboard/RankingTable'
import ErrorMessage from 'components/shared/ErrorMessage'
import dashboardConfig from 'dashboardConfig'
import useGetDriversStandings from 'hooks/useGetDriversStandings'
import { DriverStanding } from 'interfaces/driversStanding'
import { useSession } from 'next-auth/react'

const DriversStanding = () => {
  const { status } = useSession()
  const loading = status === 'loading'

  const { driversStanding, isLoading, isError, isLoadingSlow } =
    useGetDriversStandings(dashboardConfig.currentYear)

  const hidden: CSSObject = {
    display: 'none',
  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  if (isError)
    return (
      <ErrorMessage message="Ha ocurrido un error al obtener el calendario" />
    )

  if (isLoading)
    return (
      <>
        <Center>
          <MediaQuery largerThan={935} styles={hidden}>
            <Skeleton height={215} width="100%" radius="md" />
          </MediaQuery>
          <MediaQuery smallerThan={935} styles={hidden}>
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

  let standings: DriverStanding[] | null = null

  if (driversStanding!.MRData!.StandingsTable?.StandingsLists !== undefined) {
    standings =
      driversStanding!.MRData!.StandingsTable!.StandingsLists[0].DriverStandings
  }

  let data: { position: number; points: number; name: string }[] = []

  if (standings) {
    data = standings.map((e: DriverStanding) => {
      return {
        position: Number(e.position),
        points: Number(e.points),
        name: `${e.Driver.givenName} ${e.Driver.familyName}`,
      }
    })
  }

  return (
    <>
      <RankingTable title="Mundial de pilotos" data={data} />
    </>
  )
}

export default DriversStanding
