import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
 
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    padding: 0.5rem;
    border-radius: 4px;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.primary};
    }
  }

  ul {
    list-style: none;
  }

  img {
    display: block;
    max-width: 100%;
  }
    *:focus-visible {
  outline: 3px solid #3182ce;
  outline-offset: 3px;
}

`
