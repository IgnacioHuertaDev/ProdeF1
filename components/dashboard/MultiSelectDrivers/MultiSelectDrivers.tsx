import { Center, CSSObject, MediaQuery, Skeleton } from '@mantine/core'
import ErrorMessage from 'components/shared/ErrorMessage'
import useGetDrivers from 'hooks/useGetDrivers'
import { ItemProps } from './SelectItem/SelectItem'

const MultiSelectDrivers = () => {
  //   const { drivers, isLoading, isError, isLoadingSlow } = useGetDrivers(
  //     dashboardConfig.currentYear
  //   )
  const { drivers, isLoading, isError, isLoadingSlow } = useGetDrivers(2022)

  const hidden: CSSObject = {
    display: 'none',
  }

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

  let data: ItemProps[] = []

  // if (drivers?.MRData.DriverTable.Drivers.length != 0) {
  //   data = await Promise.all(
  //     drivers?.MRData.DriverTable.Drivers.map(async (driver) => ({
  //       image: await getDriverUrlImage(
  //         driver.url.replace('http://en.wikipedia.org/wiki/', '')
  //       ),
  //       label: driver.familyName,
  //       value: driver.driverId,
  //       description: driver.nationality,
  //     }))
  //   )
  //   data = await Promise.all(
  //     drivers?.MRData.DriverTable.Drivers.map(async (driver) => ({
  //       image: await getDriverUrlImage(
  //         driver.url.replace('http://en.wikipedia.org/wiki/', '')
  //       ),
  //       label: driver.familyName,
  //       value: driver.driverId,
  //       description: driver.nationality,
  //     }))
  //   )
  // }

  return (
    <>
      {/* <MultiSelect
        label="Choose employees of the month"
        placeholder="Pick all you like"
        itemComponent={SelectItem}
        data={data}
        searchable
        nothingFound="No hay pilotos disponibles"
        maxDropdownHeight={400}
        // filter={(value, selected, item) =>
        //   !selected &&
        //   (item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
        //     item.description.toLowerCase().includes(value.toLowerCase().trim()))
        // }
      /> */}
    </>
  )
}

export default MultiSelectDrivers
