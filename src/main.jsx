import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { applyStructuredData } from './data/structuredData';
import './styles/main.scss';

applyStructuredData(window.location.pathname);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
