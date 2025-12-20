import { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

// 1. Criação do Contexto (O "canal" de comunicação)
const LanguageContext = createContext();

/**
 * Provider: Componente que envolve o App e fornece os dados de idioma.
 */
export function LanguageProvider({ children }) {
  // Estado que guarda 'en' ou 'pt'
  const [language, setLanguage] = useState('en');

  /**
   * Função de Tradução (t)
   * param {string} key - A chave da tradução (ex: 'TO_DO')
   * returns {string} - O texto traduzido ou a própria chave se falhar
   */
  const t = (key) => {
    // Tenta encontrar a tradução. Se não achar, devolve a chave para não quebrar a tela.
    return translations[language][key] || key;
  };

  // Alterna entre os dois idiomas disponíveis
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'pt' : 'en'));
  };

  return (
    // Disponibiliza as funções e o estado para todos os filhos
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook Customizado
 * Facilita o uso do contexto. Em vez de importar useContext e LanguageContext,
 * os componentes só usam: const { t } = useLanguage();
 */
export const useLanguage = () => useContext(LanguageContext);