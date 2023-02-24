import { showNotification } from '@mantine/notifications'

export default function showSuccessMessage(title: string, message: string) {
  showNotification({
    title: title,
    message: message,
    autoClose: 8000,
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.teal[6],
        borderColor: theme.colors.teal[6],

        '&::before': { backgroundColor: theme.white },
      },

      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: theme.colors.teal[7] },
      },
    }),
  })
}
