import { Component, ErrorInfo, ReactNode } from 'react'
import ErrorMessage from '../ErrorMessage'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorMessage message="Ha ocurrido un error inesperado, vuelva a intentarlo mas tarde" />
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
