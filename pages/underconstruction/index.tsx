import styled from '@emotion/styled'
import { Title } from '@mantine/core'
import DashboardLayout from 'layouts/DashboardLayout'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ConstructionImage from 'public/assets/UnderConstruction.svg'

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
    width: 45%;
  }

  @media (max-width: 768px) {
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
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <DashboardLayout>
      <>
        <MainContainer>
          <ImageContainer>
            <Image
              src={ConstructionImage}
              priority
              layout="responsive"
              alt="Under Construction"
            />
          </ImageContainer>
          <Title align="center" order={1} mb={30}>
            {t('CONSTRUCTION')}
          </Title>
          <HomeButton onClick={() => router.back()}>{t('GO_HOME')}</HomeButton>
        </MainContainer>
      </>
    </DashboardLayout>
  )
}

export default ErrorServerPage
