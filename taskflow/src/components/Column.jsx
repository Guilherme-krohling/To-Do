import { useLanguage } from "../context/LanguageContext";

export default function Column({title, children}) {
    const {t} = useLanguage();
    return (  
        // MUDANÇA: dark:bg-dracula-current (Cinza do Dracula)
        <div className="bg-white dark:bg-dracula-current rounded-lg shadow-lg flex flex-col transition-colors">

            {/* Cabeçalho */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-dracula-comment font-bold rounded-t-lg dark:text-dracula-purple">
                {t(title)}
            </div>

            {/* tarefas */}
            <div className="p-4 space-y-2">
                {children}
            </div>
        </div>
        
    );
};
