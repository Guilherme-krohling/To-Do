import { useLanguage } from '../context/LanguageContext';

export default function Header({mudarTema, darkMode}) {
    const { toggleLanguage, language, t} = useLanguage();
    return (
        // MUDANÇA: dark:bg-dracula-bg e borda inferior para separar
        <header className="bg-blue-600 dark:bg-dracula-bg dark:border-b dark:border-dracula-current text-white p-4 flex justify-between items-center gap-4 transition-colors">
            <h1 className="text-2xl font-bold text-white dark:text-dracula-purple">TaskFlow</h1>
            <div className="flex gap-4">
                
                <button className="bg-blue-700 text-white hover:bg-slate-800 dark:bg-gradient-to-r dark:from-dracula-purple dark:to-dracula-pink dark:text-white px-4 py-2 rounded-md transition-all font-bold shadow-lg flex items-center gap-2"
                    onClick={mudarTema}>
                        {/* Se darkMode for true, mostra tradução de escuro, senão claro */}
                        {darkMode ? t('THEME_DARK') : t('THEME_LIGHT')} 🌓
                </button>
                <button className=" bg-blue-700 text-white hover:bg-slate-800  dark:bg-dracula-current dark:text-dracula-fg dark:hover:bg-dracula-comment px-4 py-2 rounded-md transition-colors font-bold shadow-md"
                    onClick={toggleLanguage}>
                        {language === 'en' ? 'English' : 'PT-BR' }
                </button>
            </div>
        </header>
    );
};