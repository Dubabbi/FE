import React from 'react';
import Router from './Router';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './style/globalStyle';
import { AuthProvider } from '/contexts/AuthContext';
import { theme } from './style/theme';
import LoginModal from './components/Nav/LoginModal';


export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <Router>
          <LoginModal />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
