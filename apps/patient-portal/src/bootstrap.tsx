import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

// Check if we're hydrating SSR content or doing initial render
if (rootElement.hasChildNodes()) {
  // Hydrate SSR content
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  // Initial client-side render (fallback)
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}
