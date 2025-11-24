import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string
    color: string
    card: string
    text: string
    textSecondary: string
    border: string
    primary: string
    input: string
    buttonBackground: string
    buttonColor: string
    buttonHoverBackground: string
    buttonHoverColor: string
    navbarBackground: string
    navbarColor: string
    navbarHoverBackground: string
    navbarHoverColor: string
  }
}
