import { Avatar, Group, Text } from '@mantine/core'
import { forwardRef } from 'react'

export interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string
  label: string
  description: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text>{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
)

SelectItem.displayName = 'UserButton'

export default SelectItem
