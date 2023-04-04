import styled from '@emotion/styled'
import {
  Box,
  Center,
  Divider,
  MediaQuery,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from '@mantine/core'
import LineChart from 'components/dashboard/LineChart/LineChart'
import PredictionAccordion from 'components/dashboard/PredictionAccordion/PredictionAccordion'
import ErrorMessage from 'components/shared/ErrorMessage'
import dashboardConfig from 'dashboardConfig'
import 'dayjs/locale/es'
import useGetUserAndProdeByYearUser from 'hooks/useGetUserAndProdeByYearUser'
import DashboardLayout from 'layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export const LineChartContainer = styled.div`
  width: 100%;
  margin: 0;
`

const UserProfile = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const userName = router.query.id as string

  const { userprofile, isLoading, isError, isLoadingSlow } =
    useGetUserAndProdeByYearUser(dashboardConfig.currentYear, userName)

  const loading = status === 'loading'

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  if (isError)
    return (
      <ErrorMessage
        message="Ha ocurrido un error al obtener el perfil"
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

  const isMyProfile = session?.user?.name === userprofile?.user.name

  const ptsTotales = userprofile
    ? userprofile.predictions.reduce(
        (puntos, prediction) => puntos + prediction.puntaje,
        0
      )
    : 0

  const promedioPts = userprofile?.predictions
    ? ptsTotales / userprofile?.predictions?.length
    : 0

  const prediccionesConPuntajeAcumulado = userprofile?.predictions.map(
    (carrera, index, array) => {
      const puntajeAcumulado = array
        .slice(0, index + 1)
        .reduce((total, carrera) => total + carrera.puntaje, 0)
      return { ...carrera, puntaje: puntajeAcumulado }
    }
  )

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl * 1.5,
        })}
      >
        <Title order={1} mb={15}>
          {isMyProfile ? 'Mi perfil' : userprofile?.user.name}
        </Title>
        {isMyProfile ? (
          <>
            <Divider mb={25} />
            <Title order={2} mb={15}>
              {isMyProfile ? 'Mis datos' : null}
            </Title>
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'lg', cols: 1 }]}>
              <Box>
                <Title order={4}>Nombre:&nbsp;</Title>
                <Text color="gray.6">{userprofile?.user.name}</Text>
              </Box>
              {isMyProfile ? (
                <Box>
                  <Title order={4}>Email:&nbsp;</Title>
                  <Text color="gray.6">{userprofile?.user.email}</Text>
                </Box>
              ) : null}
            </SimpleGrid>
          </>
        ) : null}
        <Divider mt={25} mb={25} />
        <Title order={2} mb={15}>
          {isMyProfile ? 'Mis estadísticas' : 'Estadísticas'}
        </Title>
        <SimpleGrid
          mt={25}
          cols={2}
          breakpoints={[{ maxWidth: 'lg', cols: 1 }]}
        >
          <Box>
            <Title order={4}>Puntos:&nbsp;</Title>
            <Text color="gray.6">{ptsTotales}</Text>
          </Box>
          <Box>
            <Title order={4}>Promedio de pts. por carrera:&nbsp;</Title>
            <Text color="gray.6">{promedioPts.toFixed(2)}</Text>
          </Box>
        </SimpleGrid>
        <Title mt={35} order={4}>
          Predicciones por carrera:&nbsp;
        </Title>
        <PredictionAccordion predicctions={userprofile?.predictions} />
        <SimpleGrid
          mt={45}
          cols={2}
          breakpoints={[{ maxWidth: 'lg', cols: 1 }]}
        >
          {userprofile && (
            <>
              <Box>
                <Title order={3} mb={15}>
                  Progreso de puntos
                </Title>
                <LineChartContainer>
                  <LineChart predicctions={prediccionesConPuntajeAcumulado} />
                </LineChartContainer>
              </Box>
            </>
          )}

          {userprofile && (
            <>
              <Box>
                <Title order={3} mb={15}>
                  Puntos por carrera
                </Title>
                <LineChartContainer>
                  <LineChart predicctions={userprofile.predictions} />
                </LineChartContainer>
              </Box>
            </>
          )}
        </SimpleGrid>
      </Box>
    </>
  )
}

UserProfile.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default UserProfile
