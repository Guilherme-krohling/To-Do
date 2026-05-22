import { useLanguage } from '../context/LanguageContext';

/**
 * Cabeçalho da Aplicação.
 * Recebe funções via Props (mudarTema) e consome dados do Contexto (Idioma).
 */
export default function Header({ mudarTema, darkMode, abrirMenu }) {
    const { toggleLanguage, language, t } = useLanguage();

    return (
        <header className="bg-blue-600 dark:bg-dracula-bg dark:border-b dark:border-dracula-current text-white px-3 py-3 md:p-4 flex flex-row justify-between items-center gap-2 md:gap-4 transition-colors">

            <div className="flex items-center gap-2 md:gap-3 shrink-0">
                {/* Botão menu Mobile */}
                <button
                    className="md:hidden text-white dark:text-dracula-fg text-2xl md:text-3xl leading-none"
                    onClick={abrirMenu}
                >
                    ☰
                </button>

                {/* Logo / Título */}
                <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-white dark:text-dracula-purple shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-7 md:h-7 stroke-white dark:stroke-dracula-purple" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 12.5l2.5 2.5L16 9" stroke="#50fa7b" />
                        <rect x="3" y="3" width="18" height="18" rx="4" />
                    </svg>
                    <span>{t('APP_TITLE')}</span>
                </h1>
            </div>

            {/* Área de Botões */}
            <div className="flex gap-2">

                {/* Botão de Tema */}
                <button
                    className="bg-blue-700 text-white hover:bg-blue-800 dark:bg-gradient-to-r dark:from-dracula-purple dark:to-dracula-pink dark:text-white px-2 py-2 md:px-4 rounded-md transition-all font-bold shadow-lg flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap"
                    onClick={mudarTema}
                >
                    <span className="hidden sm:inline">{darkMode ? t('THEME_DARK') : t('THEME_LIGHT')}</span> 🌓
                </button>

                {/* Botão de Idioma */}
                <button
                    className="bg-blue-700 text-white hover:bg-blue-800 dark:bg-dracula-current dark:text-dracula-fg dark:hover:bg-dracula-comment px-2 py-2 md:px-4 rounded-md transition-colors font-bold shadow-md text-xs md:text-sm whitespace-nowrap min-w-[50px] md:min-w-[100px]"
                    onClick={toggleLanguage}
                >
                    {language === 'en' ? 'EN' : 'PT-BR'}
                </button>
            </div>
        </header>
    );
};