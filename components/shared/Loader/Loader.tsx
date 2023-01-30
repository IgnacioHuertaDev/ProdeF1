import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

type LoaderProps = {
  color: string
}

const rotate = keyframes`
  /* 100% {transform: rotate(360deg) translate(30px)} */
  0% { transform: rotate(0deg) scale(0.8) }
  50% { transform: rotate(360deg) scale(1.2) }
  100% { transform: rotate(720deg) scale(0.8) }
`

const ball1 = (color: string) => keyframes`
  0% {
    box-shadow: 30px 0 0 ${color};
  }
  50% {
    box-shadow: 0 0 0 ${color};
    margin-bottom: 0;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 ${color};
    margin-bottom: 10px;
  }
`

const ball2 = (color: string) => keyframes`
  0% {
    box-shadow: 30px 0 0 ${color};
  }
  50% {
    box-shadow: 0 0 0 ${color};
    margin-top: -20px;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 ${color};
    margin-top: 0;
  }
`

const StyledLoader = styled.span<LoaderProps>`
  animation: ${rotate} 1s infinite;
  height: 50px;
  width: 50px;

  &:before,
  &:after {
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;
    width: 20px;
  }

  &:before {
    animation: ${(props) => ball1(props.color)} 1s infinite;
    background-color: ${(props) => props.color || '#000'};
    box-shadow: 30px 0 0 ${(props) => props.color || '#000'};
    margin-bottom: 10px;
  }

  &:after {
    /* animation-delay: 0.5s */
    animation: ${(props) => ball2(props.color)} 1s infinite;
    background-color: ${(props) => props.color || '#000'};
    box-shadow: 30px 0 0 ${(props) => props.color || '#000'};
  }
`

const Loader = ({ color = '#fff' }) => {
  return <StyledLoader color={color} />
}

export default Loader
