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
`;
