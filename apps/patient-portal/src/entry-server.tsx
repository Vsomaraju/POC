import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';

export function render(url: string, context: any = {}) {
  const html = renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StaticRouter>
    </React.StrictMode>
  );

  return { html, context };
}

