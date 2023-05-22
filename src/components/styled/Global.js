import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  
html {
    min-width: fit-content;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000022;
    color: white;
    font-size: 1.25rem;
    min-width: 350px;
    overflow-x: hidden;
  }

  label {
    cursor: pointer;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ScrollBar */
  ::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
  }
  ::-webkit-scrollbar-track {
    background: #ffffff30;
    border-radius: 1.25rem;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffb300;
    border-radius: 1.25rem;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #bd8300;
  
`;
