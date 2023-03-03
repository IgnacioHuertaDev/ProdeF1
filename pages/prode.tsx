import {
  Box,
  Button,
  Center,
  createStyles,
  CSSObject,
  Group,
  MediaQuery,
  Paper,
  Skeleton,
  Text,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconGps } from '@tabler/icons'
import ProdeForm from 'components/dashboard/ProdeForm'
import RulesModal from 'components/dashboard/RulesModal'
import ErrorMessage from 'components/shared/ErrorMessage'
import dashboardConfig from 'dashboardConfig'
import dayjs from 'dayjs'
import useGetSchedule from 'hooks/useGetSchedule'
import { Race } from 'interfaces/schedule'
import DashboardLayout from 'layouts/DashboardLayout'
import { useSession } from 'next-auth/react'
import { ReactElement } from 'react'
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter'

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}))

const Prode = () => {
  const formatoFecha = 'YYYY-MM-DD/HH:mm:ss[Z]' // formato reconocido por Dayjs

  const { classes } = useStyles()
  const { status } = useSession()
  const [opened, { open, close }] = useDisclosure(false)

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

  let races: Race[] | null = null

  if (schedule?.MRData!.RaceTable?.Races !== undefined) {
    races = schedule!.MRData!.RaceTable!.Races
  }

  let carreraActual: Race[] = []

  if (races) {
    carreraActual = races.filter((race) => dayjs(race.date) > dayjs())
  }

  const ActualRace = () => {
    if (carreraActual.length != 0) {
      return (
        <>
          <Paper withBorder p="md" radius="md">
            <Group position="apart">
              <Text size="xs" color="dimmed" className={classes.title}>
                Carrera a apostar
              </Text>
              <IconGps className={classes.icon} size={22} stroke={1.5} />
            </Group>

            <Group align="flex-end" spacing="xs" mt={25}>
              <Text size="xl" className={classes.value}>
                {carreraActual[0].raceName}
              </Text>
            </Group>
            <Text size="sm" color="dimmed" mt={7}>
              {`Carrera: ${capitalizeFirstLetter(
                dayjs(
                  `${carreraActual[0].date}/${carreraActual[0].time}`,
                  formatoFecha
                )
                  .subtract(3, 'hours')
                  .format(`dddd, D [de] MMMM, YYYY - h:mm A`)
              )}`}
            </Text>
            <Text size="sm" color="dimmed" mt={7}>
              {`Clasificación: ${capitalizeFirstLetter(
                dayjs(
                  `${carreraActual[0].Qualifying.date}/${carreraActual[0].time}`,
                  formatoFecha
                )
                  .subtract(3, 'hours')
                  .format(`dddd, D [de] MMMM, YYYY - h:mm A`)
              )}`}
            </Text>
          </Paper>

          <Text size="sm" className={classes.value} mt={20}>
            {`Tiempo restante: ${
              dayjs() <
              dayjs(
                `${carreraActual[0].Qualifying.date}/${carreraActual[0].Qualifying.time}`,
                formatoFecha
              ).subtract(3, 'hours')
                ? capitalizeFirstLetter(
                    dayjs().to(
                      dayjs(
                        `${carreraActual[0].Qualifying.date}/${carreraActual[0].Qualifying.time}`,
                        formatoFecha
                      ).subtract(3, 'hours'),
                      true
                    )
                  )
                : 'Predicciones cerradas'
            }`}
          </Text>
        </>
      )
    }
    return <div>No hay proximas carreras disponibles</div>
  }

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
          <ActualRace />
          <Button size="md" mt="xl" onClick={open}>
            Reglamento
          </Button>
          <RulesModal opened={opened} onClose={close} />
          <ProdeForm
            raceId={carreraActual[0]?.Circuit.circuitId}
            disableSaveButton={
              dayjs() >=
              dayjs(
                `${carreraActual[0].Qualifying.date}/${carreraActual[0].Qualifying.time}`,
                formatoFecha
              ).subtract(3, 'hours')
            }
            qualifyDate={dayjs(
              `${carreraActual[0].Qualifying.date}/${carreraActual[0].Qualifying.time}`,
              formatoFecha
            ).subtract(3, 'hours')}
          />
        </div>
      </Box>
    </>
  )
}

Prode.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Prode
