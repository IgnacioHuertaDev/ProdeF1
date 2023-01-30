import {
  Box,
  Center,
  CSSObject,
  MediaQuery,
  Skeleton,
  Table,
  Title,
} from '@mantine/core'
import RaceInfo from 'components/dashboard/RaceInfo'
import ErrorMessage from 'components/shared/ErrorMessage'
import dashboardConfig from 'dashboardConfig'
import dayjs from 'dayjs'
import useGetSchedule from 'hooks/useGetSchedule'
import { Race } from 'interfaces/schedule'
import DashboardLayout from 'layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { ReactElement } from 'react'

const Calendar = () => {
  const { status } = useSession()
  const loading = status === 'loading'

  const { schedule, isLoading, isError, isLoadingSlow } = useGetSchedule(
    dashboardConfig.currentYear
  )

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

  let races: Race[] | null = null

  if (schedule?.MRData!.RaceTable?.Races !== undefined) {
    races = schedule!.MRData!.RaceTable!.Races
  }

  let rows
  let data: {
    title: string
    icon: 'gps'
    raceName: string
    date: string
  }[] = []

  if (races) {
    rows = races.map((element) => (
      <tr key={element.raceName}>
        <td>{element.raceName}</td>
        <td>{element.Circuit.circuitName}</td>
        <td>{element.date}</td>
        <td>{element.time}</td>
      </tr>
    ))

    const carreraAnterior = races.filter((race) => dayjs(race.date) <= dayjs())
    const carreraProxima = races.filter((race) => dayjs(race.date) > dayjs())

    if (carreraAnterior.length != 0) {
      data.push({
        title: 'Carrera anterior',
        icon: 'gps' as const,
        raceName: carreraAnterior[0].raceName,
        date: carreraAnterior[0].date,
      })
    }
    if (carreraProxima.length != 0) {
      data.push({
        title: 'Carrera proxima',
        icon: 'gps' as const,
        raceName: carreraProxima[0].raceName,
        date: carreraProxima[0].date,
      })
    }
  }

  return (
    <>
      <RaceInfo data={data} />
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl * 1.5,
        })}
      >
        <div>
          <Title order={1} mb={15}>
            Calendario
          </Title>
          <Table>
            <thead>
              <tr>
                <th>Carrera</th>
                <th>Nombre del circuito</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {races ? rows : 'No hay un calendario definido para este año'}
            </tbody>
          </Table>
        </div>
      </Box>
    </>
  )
}

Calendar.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Calendar
