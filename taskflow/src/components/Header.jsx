import { useLanguage } from '../context/LanguageContext';

/**
 * Cabeçalho da Aplicação.
 * Recebe funções via Props (mudarTema) e consome dados do Contexto (Idioma).
 */
export default function Header({ mudarTema, darkMode }) {
    const { toggleLanguage, language, t } = useLanguage();

    return (
        <header className="bg-blue-600 dark:bg-dracula-bg dark:border-b dark:border-dracula-current text-white p-4 flex justify-between items-center gap-4 transition-colors">
            {/* Logo / Título */}
            <h1 className="text-2xl font-bold text-white dark:text-dracula-purple">
                TaskFlow
            </h1>

            {/* Área de Botões */}
            <div className="flex gap-4">
                
                {/* Botão de Tema */}
                <button 
                    className="bg-blue-700 text-white hover:bg-slate-800 dark:bg-gradient-to-r dark:from-dracula-purple dark:to-dracula-pink dark:text-white px-4 py-2 rounded-md transition-all font-bold shadow-lg flex items-center gap-2"
                    onClick={mudarTema}
                >
                    {darkMode ? t('THEME_DARK') : t('THEME_LIGHT')} 🌓
                </button>
                
                {/* Botão de Idioma */}
                <button 
                    className="bg-blue-700 text-white hover:bg-slate-800 dark:bg-dracula-current dark:text-dracula-fg dark:hover:bg-dracula-comment px-4 py-2 rounded-md transition-colors font-bold shadow-md min-w-[100px]"
                    onClick={toggleLanguage}
                >
                    {language === 'en' ? 'English' : 'PT-BR' }
                </button>
            </div>
        </header>
    );
};