import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, ThemeProvider, ToastProvider } from './context';
import { AppRouter } from './routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AppRouter />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
