import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ModeProvider } from './contexts/ModeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModeProvider>
        <App />
    </ModeProvider>
  </React.StrictMode>
);
