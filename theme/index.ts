import { MantineTheme, MantineThemeOverride } from '@mantine/core'

const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Poppins, sans-serif',
  headings: { fontFamily: 'Telegraf, sans-serif' },
  colors: {
    mainBrand: [
      '#EADDDB',
      '#DEC1BE',
      '#D7A5A0',
      '#D6877F',
      '#DB665B',
      '#E84231',
      '#FF1801',
      '#CF2817',
      '#AA3125',
      '#8D362E',
    ],
    nonwhite: ['#F5F7F9'],
  },
  primaryColor: 'mainBrand',
  globalStyles: (theme) => ({
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },

    body: {
      ...theme.fn.fontStyles(),
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#F5F5F5',
    },
  }),
  components: {
    Button: {
      defaultProps: (theme: MantineTheme) => ({
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
      }),
    },
    Modal: {
      styles: (theme) => ({
        modal: {
          borderRadius: theme.radius.lg,
        },
        title: {
          color: theme.colors.gray[6],
        },
      }),
    },
  },
}

export default theme
