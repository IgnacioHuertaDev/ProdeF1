import { showNotification } from '@mantine/notifications'

export default function showDangerMessage(title: string, message: string) {
  showNotification({
    title: title,
    message: message,
    autoClose: 5000,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.red[6],
        borderColor: theme.colors.red[6],

        '&::before': { backgroundColor: theme.white },
      },

      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: theme.colors.red[7] },
      },
    }),
  })
}
