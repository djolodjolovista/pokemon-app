import { ThemeProvider } from 'styled-components'
import { Toaster } from 'react-hot-toast'
import { useAppStore } from './store/appStore'
import { AppRouter } from './routes'
import { Theme } from './store/theme.enum'
import { darkTheme, lightTheme } from './styles/theme'
import { GlobalStyle } from './styles/GlobalStyles'

const App = () => {
  const theme = useAppStore((state) => state.theme)

  return (
    <ThemeProvider theme={theme !== Theme.Light ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppRouter />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
