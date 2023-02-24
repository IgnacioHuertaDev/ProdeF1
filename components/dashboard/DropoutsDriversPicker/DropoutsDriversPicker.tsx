import { Box, Group, Select } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { Driver } from 'interfaces/drivers'

interface FormValues {
  drivers: { posicion: number; pilotoId: string }[]
  dropouts: string[]
}

interface DropoutsDriversPickerProps {
  drivers: Driver[]
  form: UseFormReturnType<FormValues>
}

const DropoutsDriversPicker = ({
  drivers,
  form,
}: DropoutsDriversPickerProps) => {
  const fields = form.values.dropouts.map((_, index) => {
    return (
      <Group mt="xs" key={index} grow pb={32}>
        <Select
          searchable
          nothingFound="No hay pilotos disponibles para seleccionar"
          data={drivers?.map((driver) => ({
            value: driver.code,
            label: `${driver.givenName} ${driver.familyName} [${driver.code}]`,
          }))}
          {...form.getInputProps(`dropouts.${index}`)}
        />
      </Group>
    )
  })

  return (
    <>
      <Box mx="auto" mt={48}>
        {fields}
      </Box>
    </>
  )
}

export default DropoutsDriversPicker
