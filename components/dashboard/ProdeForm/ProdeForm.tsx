import { Center, CSSObject, MediaQuery, Skeleton } from '@mantine/core'
import ErrorMessage from 'components/shared/ErrorMessage'
import useGetDrivers from 'hooks/useGetDrivers'
import { useSession } from 'next-auth/react'
import MultiSelectDrivers from '../MultiSelectDrivers'

const ProdeForm = () => {
  const { status } = useSession()
  const loading = status === 'loading'

  //   const { drivers, isLoading, isError, isLoadingSlow } = useGetDrivers(
  //     dashboardConfig.currentYear
  //   )
  const { drivers, isLoading, isError, isLoadingSlow } = useGetDrivers(2022)

  const hidden: CSSObject = {
    display: 'none',
  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  if (isError)
    return (
      <ErrorMessage message="Ha ocurrido un error al obtener los pilotos" />
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

  return (
    <>
      <MultiSelectDrivers />
    </>
  )
}

export default ProdeForm
