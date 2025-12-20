import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Importa o Tailwind

import { LanguageProvider } from './context/LanguageContext.jsx'

/**
 * Ponto de Entrada da Aplicação.
 * Envolve o App com os Providers globais (LanguageProvider).
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)