import Image from 'next/image'
import Link from 'next/link'
import ErrorImage from 'public/assets/404.svg'
import styled from '@emotion/styled'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 80%;
`

const ImageContainer = styled.div`
  width: 50%;
  margin: 0 10%;

  @media (max-width: 900px) {
    width: 80%;
  }
`

const HomeButton = styled.a`
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  background-color: #777777;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`

const ErrorPage = () => {
  return (
    <>
      <MainContainer>
        <ImageContainer>
          <Image
            src={ErrorImage}
            priority
            layout="responsive"
            alt="404 Server Error Image"
          />
        </ImageContainer>
        <Link href="/" passHref>
          <HomeButton>Volver al inicio</HomeButton>
        </Link>
      </MainContainer>
    </>
  )
}

export default ErrorPage
