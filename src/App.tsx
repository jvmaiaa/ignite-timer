import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from './router/Router';
import { defaultTheme } from './styles/default';
import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={Router}/> 
      <GlobalStyle />
    </ThemeProvider>
  );
};
