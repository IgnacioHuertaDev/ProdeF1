import styled from '@emotion/styled'
import {
  Anchor,
  Button,
  createStyles,
  keyframes,
  LoadingOverlay,
  MantineProvider,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { upperFirst, useToggle } from '@mantine/hooks'
import axios from 'axios'
import Loader from 'components/shared/Loader'
import { AuthFormProvider, useAuthForm } from 'context/AuthFormContext'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import BrandLogo from 'public/assets/brandLogo.png'
import { useState } from 'react'
import showDangerMessage from 'utils/showDangerMessage'

export const bgWave = keyframes({
  '0%': { backgroundPosition: '0% 0%' },
  '25%': { backgroundPosition: '40% 10%' },
  '50%': { backgroundPosition: '20% 0%' },
  '75%': { backgroundPosition: '10% 40%' },
  '100%': { backgroundPosition: '0% 0%' },
})

const useStyles = createStyles((theme) => ({
  container: {
    display: 'grid',
    placeItems: 'center',
    margin: 0,
    padding: '0 24px',
    verticalAlign: 'center',
    minHeight: '100vh',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg id='visual' viewBox='0 0 1920 1080' width='1920' height='1080' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3e%3crect x='0' y='0' width='1920' height='1080' fill='%23f5f5f5'%3e%3c/rect%3e%3cdefs%3e%3clinearGradient id='grad1_0' x1='43.8%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='14.444444444444446%25' stop-color='%23f5f5f5' stop-opacity='1'%3e%3c/stop%3e%3cstop offset='85.55555555555554%25' stop-color='%23f5f5f5' stop-opacity='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cdefs%3e%3clinearGradient id='grad2_0' x1='0%25' y1='0%25' x2='56.3%25' y2='100%25'%3e%3cstop offset='14.444444444444446%25' stop-color='%23f5f5f5' stop-opacity='1'%3e%3c/stop%3e%3cstop offset='85.55555555555554%25' stop-color='%23f5f5f5' stop-opacity='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cg transform='translate(1920, 0)'%3e%3cpath d='M0 810C-168.6 804.4 -337.3 798.8 -405 701.5C-472.7 604.2 -439.5 415.2 -490.2 283C-540.8 150.8 -675.4 75.4 -810 0L0 0Z' fill='%23${theme.colors.mainBrand[6].slice(
      1
    )}'%3e%3c/path%3e%3c/g%3e%3cg transform='translate(0, 1080)'%3e%3cpath d='M0 -810C67.1 -661.1 134.3 -512.2 267.5 -463.3C400.7 -414.4 600 -465.6 701.5 -405C802.9 -344.4 806.5 -172.2 810 0L0 0Z' fill='%23${theme.colors.mainBrand[6].slice(
      1
    )}'%3e%3c/path%3e%3c/g%3e%3c/svg%3e")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    animation: `${bgWave} 10s infinite ease-in-out alternate`,

    [`@media (min-width: 450px)`]: {
      padding: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Poppins, ${theme.fontFamily}`,
  },

  label: {
    color: theme.colors.gray[6],
  },
}))

type FormContainerProps = {
  backgroundColor?: string
}

const FormContainer = styled.div<FormContainerProps>`
  ${(props) =>
    `background:${props.backgroundColor}` || `background-color: black`};
  overflow: hidden;
  position: relative;
  width: 90%;
  padding: 30px;
  border-radius: 22px;
  box-shadow: 0 100px 100px rgb(0 0 0 / 10%);

  &:before {
    content: '';
    position: absolute;
    top: -860px;
    left: 50%;
    translate: -50% 0;
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    background-color: #fff;
  }

  @media (min-width: 450px) {
    max-width: 380px;
  }
`

const ImageContainer = styled.div`
  width: 75%;
  margin: -2rem auto 1rem auto;

  @media (max-width: 770px) {
    width: 60%;
    margin: 1rem auto 5rem auto;
  }
`

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const Authentication = () => {
  const { classes } = useStyles()
  const router = useRouter()
  const [loadingRequest, setLoadingRequest] = useState(false)
  const theme = useMantineTheme()

  const [type, toggle] = useToggle(['login', 'registrarse'])
  const authForm = useAuthForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Email invalido'),
      password: (val) =>
        val.length <= 3
          ? 'La contraseña debe tener al menos 4 caracteres'
          : null,
    },
  })

  const redirectToHome = () => {
    router.push('/')
  }

  const registerUser = async () => {
    setLoadingRequest(true)
    await axios
      .post(
        '/api/register',
        {
          username: authForm.values.name,
          email: authForm.values.email,
          password: authForm.values.password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then(async () => {
        setLoadingRequest(false)
        await loginUser()
        redirectToHome()
      })
      .catch((error) => {
        showDangerMessage('Error al registrarse', error)
      })
  }

  const loginUser = async () => {
    setLoadingRequest(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: authForm.values.email,
      password: authForm.values.password,
      callbackUrl: '/',
    })

    res?.error
      ? showDangerMessage('Error al loguearse', res.error)
      : redirectToHome()
    setLoadingRequest(false)
  }

  return (
    <MantineProvider
      theme={{
        components: {
          InputWrapper: {
            styles: (theme) => ({
              input: {
                backgroundColor: theme.white,
                border: theme.colors.gray[6],
                color: theme.colors.dark[9],
              },
              label: {
                color: theme.white,
              },
              error: {
                color: theme.white,
              },
            }),
          },
        },
      }}
    >
      <AuthFormProvider form={authForm}>
        <div className={classes.container}>
          <FormContainer backgroundColor={theme.colors.mainBrand[6]}>
            <LoadingOverlay
              visible={loadingRequest}
              overlayBlur={2}
              loaderProps={{ size: 'xl', color: 'mainBrand' }}
            />
            <ImageContainer>
              <Image
                src={BrandLogo}
                alt="Auth Image"
                layout="responsive"
                priority
              />
            </ImageContainer>
            <Title align="center" color={theme.colors.nonwhite[0]} order={1}>
              Prode F1
            </Title>
            <form
              onSubmit={authForm.onSubmit(() =>
                type === 'registrarse' ? registerUser() : loginUser()
              )}
            >
              <Stack>
                {type === 'registrarse' && (
                  <TextInput
                    label="Nombre"
                    placeholder="Tu nombre"
                    {...authForm.getInputProps('name')}
                  />
                )}

                <TextInput
                  required
                  label="Email"
                  type="email"
                  placeholder="tuemail@gmail.com"
                  {...authForm.getInputProps('email')}
                />

                <PasswordInput
                  required
                  label="Contraseña"
                  placeholder="Tu contraseña"
                  {...authForm.getInputProps('password')}
                />
              </Stack>
              <Stack mb="md" mt="md">
                <Anchor
                  component="button"
                  type="button"
                  color="gray.0"
                  onClick={() => toggle()}
                  size="xs"
                >
                  {type === 'registrarse'
                    ? 'Ya tenes cuenta? Entra'
                    : 'No tenes una cuenta? Registrate'}
                </Anchor>
                <Button variant="default" type="submit">
                  {upperFirst(type)}
                </Button>
              </Stack>
            </form>
            <LoadingOverlay
              visible={loadingRequest}
              loader={
                <LoaderContainer>
                  <Loader color={theme.colors.mainBrand[6]} />
                </LoaderContainer>
              }
            />
          </FormContainer>
        </div>
      </AuthFormProvider>
    </MantineProvider>
  )
}

export default Authentication
