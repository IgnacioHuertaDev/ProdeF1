import styled from '@emotion/styled'
import { Button, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import getBrandColor from 'utils/getBrandColor'

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  transition: all 0.5s ease-out;
`

type AlertTitleProps = {
  textColor?: string
}

export const AlertTitle = styled.h1<AlertTitleProps>`
  ${(props) => `color: ${props.textColor}` || `color: black`};
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`

interface ErrorMessageProps {
  message?: string
  showButton?: boolean
}

const ErrorMessage = ({
  message = 'Ha ocurrido un error, intente mas tarde',
  showButton = true,
}: ErrorMessageProps) => {
  const router = useRouter()
  const theme = useMantineTheme()

  return (
    <>
      <AlertContainer>
        <AlertTitle textColor={getBrandColor(theme)}>{message}</AlertTitle>
        {showButton && (
          <Button
            size={'lg'}
            styles={(theme) => ({
              root: {
                backgroundColor: theme.colors.mainBrand[6],
                paddingLeft: 20,
                paddingRight: 20,

                '&:hover': {
                  backgroundColor: theme.fn.darken(
                    theme.colors.mainBrand[6],
                    0.05
                  ),
                  '&[data-disabled]': {
                    backgroundColor: '#e9ecef',
                  },
                },
              },
            })}
            onClick={() => router.push('/')}
          >
            Volver al inicio
          </Button>
        )}
      </AlertContainer>
    </>
  )
}

export default ErrorMessage
