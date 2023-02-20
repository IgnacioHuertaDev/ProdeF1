import {
  Box,
  Center,
  CSSObject,
  MediaQuery,
  Skeleton,
  Title,
} from '@mantine/core'
import ProdeForm from 'components/dashboard/ProdeForm'
import ErrorMessage from 'components/shared/ErrorMessage'
import dashboardConfig from 'dashboardConfig'
import useGetSchedule from 'hooks/useGetSchedule'
import DashboardLayout from 'layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { ReactElement } from 'react'

const Prode = () => {
  const { status } = useSession()
  const loading = status === 'loading'

  const { schedule, isLoading, isError, isLoadingSlow } = useGetSchedule(
    dashboardConfig.currentYear
  )

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  const hidden: CSSObject = {
    display: 'none',
  }

  if (isError)
    return <ErrorMessage message="Ha ocurrido un error al obtener el prode" />

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

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl * 1.5,
        })}
      >
        <div>
          <Title order={1} mb={15}>
            Predicciones
          </Title>
          <ProdeForm />
        </div>
      </Box>
    </>
  )
}

Prode.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Prode
