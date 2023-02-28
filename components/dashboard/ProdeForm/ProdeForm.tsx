import {
  Button,
  Center,
  CSSObject,
  Group,
  MediaQuery,
  SimpleGrid,
  Skeleton,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import DropoutsDriversPicker from 'components/dashboard/DropoutsDriversPicker'
import TopDriversPicker from 'components/dashboard/TopDriversPicker'
import ErrorMessage from 'components/shared/ErrorMessage'
import dashboardConfig from 'dashboardConfig'
import dayjs, { Dayjs } from 'dayjs'
import useGetDrivers from 'hooks/useGetDrivers'
import getProdeByRaceYearUser from 'lib/getProdeByRaceYearUser'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import showDangerMessage from 'utils/showDangerMessage'
import showSuccessMessage from 'utils/showSuccessMessage'

interface ProdeFormProps {
  raceId: string
  disableSaveButton: boolean
  qualifyDate: Dayjs
}

const ProdeForm = ({
  raceId,
  disableSaveButton,
  qualifyDate,
}: ProdeFormProps) => {
  const { data: session, status } = useSession()

  const loading = status === 'loading'
  const carreraId = raceId != undefined ? raceId : 'NORACE'

  // const { drivers, isLoading, isError, isLoadingSlow } = useGetDrivers(
  //   dashboardConfig.currentYear
  // )
  const { drivers, isLoading, isError, isLoadingSlow } = useGetDrivers(2022)
  const [isLoadingProde, setIsLoadingProde] = useState(true)

  const form = useForm({
    initialValues: {
      drivers: [
        { posicion: 1, pilotoId: '' },
        { posicion: 2, pilotoId: '' },
        { posicion: 3, pilotoId: '' },
        { posicion: 4, pilotoId: '' },
        { posicion: 5, pilotoId: '' },
      ],

      dropouts: ['', '', ''],
    },
  })

  useEffect(() => {
    async function getFormValues() {
      const res = await getProdeByRaceYearUser(
        carreraId,
        dashboardConfig.currentYear,
        session?.user?.name
      )
      const prodeValues = res.obj
      if (prodeValues) {
        form.values.drivers = prodeValues.pilotosTop
        form.values.dropouts = prodeValues.pilotosAbandono
      }
      setIsLoadingProde(false)
    }
    getFormValues()
  }, [])

  const savePredictionUser = async () => {
    if (dayjs() <= qualifyDate) {
      await axios
        .post(
          '/api/savePrediction',
          {
            userName: session?.user?.name,
            raceId: carreraId,
            topDrivers: form.values.drivers,
            dropouts: form.values.dropouts,
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        )
        .then(() => {
          showSuccessMessage(
            'Prediccion guardada',
            'Su prediccion ha sido guardada con exito, puede seguir modificandola hasta antes del comienzo de la claisificación.'
          )
        })
        .catch((error) => {
          showDangerMessage('Prediccion anulada, intente nuevamente', error)
        })
    } else {
      showDangerMessage(
        'Error al guardar',
        'Ha empezado la clasificación, no se han podido guardar los resultados'
      )
    }
  }

  const hidden: CSSObject = {
    display: 'none',
  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  if (isError)
    return (
      <ErrorMessage message="Ha ocurrido un error al obtener los pilotos" />
    )

  if (isLoading || isLoadingProde)
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
      <SimpleGrid
        mt={50}
        cols={2}
        spacing={70}
        breakpoints={[{ maxWidth: 'lg', cols: 1 }]}
      >
        {drivers?.MRData.DriverTable.Drivers != undefined && (
          <>
            <div>
              <Title order={3} mb={15}>
                Top 5 Pilotos
              </Title>
              <TopDriversPicker
                drivers={drivers?.MRData.DriverTable.Drivers}
                form={form}
              />
            </div>
            <div>
              <Title order={3} mb={15}>
                Abandonos
              </Title>
              <DropoutsDriversPicker
                drivers={drivers?.MRData.DriverTable.Drivers}
                form={form}
              />
            </div>
          </>
        )}
      </SimpleGrid>
      <Group position="center" mt="xl">
        <Button
          size="xl"
          disabled={disableSaveButton}
          onClick={() => {
            savePredictionUser()
          }}
        >
          Guardar predicción
        </Button>
      </Group>
    </>
  )
}

export default ProdeForm
