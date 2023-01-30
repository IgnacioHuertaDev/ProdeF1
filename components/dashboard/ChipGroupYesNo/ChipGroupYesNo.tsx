import { Chip, createStyles } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'

const useChipStyles = createStyles((theme, _params, getRef) => ({
  label: {
    '&[data-checked][data-variant="filled"]': {
      '&, &:hover': {
        backgroundColor: `${theme.colors.mainBrand[6]}ab`,
        color: theme.white,
      },

      [`& .${getRef('iconWrapper')}`]: {
        color: theme.white,
      },
    },
    height: '50px',
    fontSize: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.mainBrand[6],
  },

  iconWrapper: {
    ref: getRef('iconWrapper'),
  },
}))

interface ChipGroupYesNoProps {
  value: string | undefined
  setValue: Dispatch<SetStateAction<string | undefined>>
}

const ChipGroupYesNo = ({ value, setValue }: ChipGroupYesNoProps) => {
  const { classes } = useChipStyles()

  return (
    <Chip.Group multiple={false} value={value} onChange={setValue}>
      <Chip classNames={classes} variant="filled" size="md" value={'true'}>
        Si
      </Chip>
      <Chip classNames={classes} variant="filled" size="md" value={'false'}>
        No
      </Chip>
    </Chip.Group>
  )
}

export default ChipGroupYesNo
