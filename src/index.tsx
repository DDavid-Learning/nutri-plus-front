import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './core/styles/main.sass'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConsultProvider } from './core/context/AuthProvider/contextConsult/ConsultContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const query = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <ConsultProvider>
        <App />
      </ConsultProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
