import { ReactNode } from 'react'
import { Button } from '@mantine/core'
import { useRouter } from 'next/router'
import { TbArrowBackUp } from 'react-icons/tb'
interface BackButtonProps {
  children: ReactNode
}

const BackButton = ({ children }: BackButtonProps) => {
  const router = useRouter()

  return (
    <Button
      size={'lg'}
      styles={(theme) => ({
        root: {
          backgroundColor: theme.colors.mainBrand[6],
          paddingLeft: 20,
          paddingRight: 20,

          '&:hover': {
            backgroundColor: theme.fn.darken(theme.colors.mainBrand[6], 0.05),
            '&[data-disabled]': {
              backgroundColor: '#e9ecef',
            },
          },
        },
      })}
      onClick={() => router.back()}
    >
      <TbArrowBackUp size={24} />
      &nbsp;{children}
    </Button>
  )
}

export default BackButton
