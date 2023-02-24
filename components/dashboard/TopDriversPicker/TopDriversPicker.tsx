import { Box, Center, Grid, Select, Text } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconGripVertical } from '@tabler/icons'
import { Driver } from 'interfaces/drivers'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

interface FormValues {
  drivers: { posicion: number; pilotoId: string }[]
  dropouts: string[]
}

interface TopDriversPickerProps {
  drivers: Driver[]
  form: UseFormReturnType<FormValues>
}

const TopDriversPicker = ({ drivers, form }: TopDriversPickerProps) => {
  const fields = form.values.drivers.map((_, index) => {
    form.values.drivers[index].posicion = index + 1
    return (
      <Draggable key={index} index={index} draggableId={index.toString()}>
        {(provided) => (
          // <Group
          //   ref={provided.innerRef}
          //   mt="xs"
          //   {...provided.draggableProps}
          //   grow
          // >
          <Grid
            ref={provided.innerRef}
            mt="xs"
            {...provided.draggableProps}
            grow
          >
            <Grid.Col p={0} pb={8} span={1}>
              <Center {...provided.dragHandleProps}>
                <IconGripVertical size={24} />
                &nbsp;
                <Text>Posicion: {form.values.drivers[index].posicion}</Text>
                &nbsp;
              </Center>
            </Grid.Col>
            <Grid.Col p={0} pb={8} span={12}>
              <Select
                searchable
                nothingFound="No hay pilotos disponibles para seleccionar"
                data={drivers?.map((driver) => ({
                  value: driver.code,
                  label: `${driver.givenName} ${driver.familyName} [${driver.code}]`,
                }))}
                {...form.getInputProps(`drivers.${index}.pilotoId`)}
              />
            </Grid.Col>
          </Grid>
          // </Group>
        )}
      </Draggable>
    )
  })

  return (
    <>
      <Box mx="auto">
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            form.reorderListItem('drivers', {
              from: source.index,
              to: destination!.index,
            })
          }}
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </>
  )
}

export default TopDriversPicker
