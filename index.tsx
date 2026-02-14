import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}