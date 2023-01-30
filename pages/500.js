import Image from 'next/image'
import Link from 'next/link'
import ErrorImage from 'public/assets/500.svg'
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
  margin: 0 auto;

  @media (max-width: 1400px) {
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

const ErrorServerPage = () => {
  return (
    <>
      <MainContainer>
        <ImageContainer>
          <Image
            src={ErrorImage}
            priority
            layout="responsive"
            alt="500 Server Error Image"
          />
        </ImageContainer>
        <Link href="/" passHref>
          <HomeButton>Volver al inicio</HomeButton>
        </Link>
      </MainContainer>
    </>
  )
}

export default ErrorServerPage
