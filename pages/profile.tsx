import {
  Box,
  Center,
  CSSObject,
  MediaQuery,
  Skeleton,
  Title,
} from '@mantine/core'
import ErrorMessage from 'components/shared/ErrorMessage'
import dashboardConfig from 'dashboardConfig'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import useGetSchedule from 'hooks/useGetSchedule'
import DashboardLayout from 'layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { ReactElement } from 'react'

const Profile = () => {
  dayjs.extend(customParseFormat)
  dayjs.locale('es')
  const { data: session, status } = useSession()
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
    return <ErrorMessage message="Ha ocurrido un error al obtener el perfil" />

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
        <Title order={1} mb={15}>
          Mi perfil
        </Title>
        <Title order={3} mb={15}>
          Proximamente...
        </Title>
        {/* <SimpleGrid
          mt={100}
          cols={2}
          breakpoints={[{ maxWidth: 'lg', cols: 1 }]}
        >
          <SimpleGrid
            cols={2}
            spacing="sm"
            breakpoints={[
              { maxWidth: 980, cols: 1, spacing: 'sm' },
              { maxWidth: 755, cols: 1, spacing: 'sm' },
            ]}
          >
            <Box>
              <Text color="gray.6">Nombre:&nbsp;</Text>
              <Text>{session?.user!.name!}</Text>
            </Box>
            <Box>
              <Text color="gray.6">Email:&nbsp;</Text>
              <Text>{session?.user!.email!}</Text>
            </Box>
          </SimpleGrid>
        </SimpleGrid> */}
      </Box>
    </>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Profile
