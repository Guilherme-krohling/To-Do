import { useState } from "react";
import { useLanguage } from '../context/LanguageContext'; // 1. Importar

export default function AddTask({add}) {
    const [title, setTitle] = useState ("");
    const [priority, setPriority] = useState("Low");
    
    // 2. Usar o hook
    const { t } = useLanguage();

    // 3. Array auxiliar para gerar o select (facilita a tradução)
    const prioritiesOptions = ["High", "Medium", "Low"];

    return (  
        <div className="mb-4">
            <div className="flex gap-2 items-end">
                {/* GRUPO 1: PRIORIDADE */}
                <div className="flex flex-col">
                    {/* Tradução da Label */}
                    <label className="text-xs text-gray-500 dark:text-dracula-comment font-bold mb-1">
                        {t('PRIORITY')}
                    </label>
                    
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-2 text-sm rounded-md border-2 border-gray-200 dark:border-dracula-comment dark:bg-dracula-bg dark:text-dracula-fg focus:outline-none focus:border-blue-500 transition-colors bg-white cursor-pointer"                          
                        >
                        {/* AQUI É O SEGREDO:
                           O 'value' continua em inglês (option) -> High/Medium/Low
                           O texto visível usa t() com UpperCase -> ALTA/MÉDIA/BAIXA
                        */}
                        {prioritiesOptions.map((option) => (
                            <option key={option} value={option}>
                                {t(option.toUpperCase())}
                            </option>
                        ))}
                    </select>
                </div>

                {/* GRUPO 2: NOME DA TAREFA */}
                <div className="flex flex-col w-full">
                    <label className="text-xs text-gray-500 dark:text-dracula-comment font-bold mb-1">
                        {t('TASK_NAME')}
                    </label>
                    <input
                        className="w-full p-2 text-sm rounded-md border-2 border-gray-200 dark:border-dracula-comment dark:bg-dracula-bg dark:text-dracula-fg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                        type="text"
                        // Tradução do Placeholder
                        placeholder={t('NEW_TASK')}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                if(!title.trim()) return;
                                add(title, priority);
                                setTitle("");
                            }
                        }}
                    />
                </div>
                <button 
                className="bg-blue-500 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-dracula-purple dark:to-dracula-pink text-white px-4 py-2 rounded-md transition-colors font-bold shadow-md mb-[2px] h-[38px]"
                onClick={() => {
                    if(!title.trim()) return;
                    add(title, priority);
                    setTitle("");
                }}>
                    {/* Opcional: Se quiser traduzir o "+" para "Adicionar", seria {t('BTN_ADD')} */}
                    +
                </button>
            </div>
        </div>  
    );
};