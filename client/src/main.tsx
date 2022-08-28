import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './bar.css';
import App from './App';
import { AuthProvider } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
