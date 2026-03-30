import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const getTranslation = (key, fallback) => {
      const translated = t(key);
      return translated && translated !== key ? translated : fallback;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("gonzaga.krohling@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  };

  return (
    <footer className="w-full bg-white dark:bg-dracula-current py-4 px-6 border-t border-gray-200 dark:border-dracula-comment text-center flex flex-col items-center justify-center shrink-0 z-10 transition-colors">
      <p className="text-xs text-gray-500 dark:text-dracula-comment mb-1.5 max-w-md">
        {getTranslation('FOOTER_PROJECT_DESC', 'Projeto interativo pensado para priorizar tarefas diárias, semanais e até anuais.')}
      </p>
      
      <p className="text-sm font-medium text-gray-700 dark:text-dracula-fg mb-2">
        {getTranslation('FOOTER_CREATED_BY', 'Criado por')} <span className="text-indigo-600 dark:text-dracula-purple font-bold">Guilherme Gonzaga Coelho Krohling</span>
      </p>
      
      <div className="flex space-x-4 items-center">
        <a 
          href="https://www.linkedin.com/in/guilherme-krohling/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-500 hover:text-indigo-700 dark:text-dracula-cyan dark:hover:text-dracula-pink transition-colors font-medium text-sm flex items-center"
        >
          LinkedIn
        </a>

        <span className="text-gray-300 dark:text-dracula-comment opacity-50">|</span>

        <button 
          onClick={handleCopyEmail}
          className="text-indigo-500 hover:text-indigo-700 dark:text-dracula-cyan dark:hover:text-dracula-pink transition-colors font-medium text-sm flex items-center bg-transparent border-none cursor-pointer p-0"
        >
          {copied ? getTranslation('FOOTER_COPIED', 'Copiado!') : 'gonzaga.krohling@gmail.com'}
        </button>
      </div>
    </footer>
  );
}
