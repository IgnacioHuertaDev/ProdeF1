import { SyntheticEvent, useState } from 'react'
import { createStyles, UnstyledButton, Menu, Group } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { CgArrowsExchangeAlt } from 'react-icons/cg'
import Esp from 'public/assets/flags/espana.png'
import Eng from 'public/assets/flags/england.png'
import Router from 'next/router'

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 10px',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.white}`,
    transition: 'background-color 150ms ease',
    backgroundColor: '#fff',

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 400,
    fontSize: theme.fontSizes.sm,
    backgroundColor: 'transparent',
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}))

export default function LanguagePicker() {
  const data = [
    { locale: 'en', image: Eng },
    { locale: 'es', image: Esp },
  ]

  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const { classes } = useStyles({ opened })
  const [selected, setSelected] = useState(
    data.find((item) => item.locale !== router.locale) || data[0]
  )

  const goToLanguage = (e: SyntheticEvent, label: string) => {
    e.preventDefault()
    router.push(`${router.pathname}${router.query}`, router.asPath, {
      locale: `${label}`,
    })
  }

  return (
    <UnstyledButton
      className={classes.control}
      onClick={(e: SyntheticEvent) => {
        setSelected(
          data.find((item) => item.locale !== router.locale) || data[0]
        )
        goToLanguage(
          e,
          data.find((item) => item.locale !== router.locale)?.locale ||
            data[0].locale
        )
      }}
    >
      <Group spacing="xs">
        <CgArrowsExchangeAlt size={20} />
        <span className={classes.label}>Change to</span>
        <Image src={selected.image} width={22} height={22} alt="flag" />
      </Group>
    </UnstyledButton>
  )
}
