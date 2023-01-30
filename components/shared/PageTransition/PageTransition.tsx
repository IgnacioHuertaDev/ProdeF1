import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

const variants = {
  fadeIn: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  inactive: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  fadeOut: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

const FullWidth = styled.div`
  width: 100%;
`

interface PageTransitionProps {
  children: JSX.Element
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const { asPath } = useRouter()

  return (
    <FullWidth>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={asPath}
          variants={variants}
          initial="fadeIn"
          animate="inactive"
          exit="fadeOut"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </FullWidth>
  )
}

export default PageTransition
