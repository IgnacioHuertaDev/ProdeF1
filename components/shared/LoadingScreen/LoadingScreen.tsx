import styled from '@emotion/styled'
import { useMantineTheme } from '@mantine/core'
import Loader from 'components/shared/Loader'
import Image from 'next/image'
import BrandLogo from 'public/assets/brandLogo.png'
import getBrandColor from 'utils/getBrandColor'

type LoadingScreenProps = {
  backgroundColor?: string
}

const LoadingScreenContainer = styled.div<LoadingScreenProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: ${(props) => props.backgroundColor || 'black'};
  height: 100vh;
`

const ImageContainer = styled.div`
  width: 15%;
  margin-bottom: 5%;

  @media (max-width: 1100px) {
    width: 25%;
    margin-bottom: 8%;
  }

  @media (max-width: 748px) {
    width: 40%;
    margin-bottom: 10%;
  }
`

interface ILoadingScreenProps {
  color?: string
}

const LoadingScreen = ({ color }: ILoadingScreenProps) => {
  const theme = useMantineTheme()

  if (!color) color = getBrandColor(theme)

  return (
    <>
      <LoadingScreenContainer backgroundColor={color}>
        <ImageContainer>
          <Image src={BrandLogo} alt="F1 Logo" layout="responsive" priority />
        </ImageContainer>
        <Loader color={theme.colors.mainBrand[6]} />
      </LoadingScreenContainer>
    </>
  )
}

export default LoadingScreen
