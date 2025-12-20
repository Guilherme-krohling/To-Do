import { useState } from "react";
import { useLanguage } from '../context/LanguageContext';

/**
 * Componente de Formulário para Criar Tarefas.
 * Utiliza o padrão "Controlled Components" onde o React controla os inputs.
 */
export default function AddTask({ add }) {
    // Hooks de Estado (Controlam o que está digitado)
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Low");
    
    // Hook de Idioma
    const { t } = useLanguage();

    // Opções de prioridade (Hardcoded aqui pois são fixas no sistema)
    const prioritiesOptions = ["High", "Medium", "Low"];

    // Handler para salvar e limpar
    const handleAdd = () => {
        if (!title.trim()) return; // Validação simples
        add(title, priority);      // Chama a função do Pai (App.jsx)
        setTitle("");              // Limpa o campo
    };

    return (  
        <div className="mb-4">
            <div className="flex gap-2 items-end">
                
                {/* --- INPUT DE PRIORIDADE --- */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 dark:text-dracula-comment font-bold mb-1">
                        {t('PRIORITY')}
                    </label>
                    
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-2 text-sm rounded-md border-2 border-gray-200 dark:border-dracula-comment dark:bg-dracula-bg dark:text-dracula-fg focus:outline-none focus:border-blue-500 transition-colors bg-white cursor-pointer"                          
                    >
                        {prioritiesOptions.map((option) => (
                            <option key={option} value={option}>
                                {t(option.toUpperCase())}
                            </option>
                        ))}
                    </select>
                </div>

                {/* --- INPUT DE TEXTO --- */}
                <div className="flex flex-col w-full">
                    <label className="text-xs text-gray-500 dark:text-dracula-comment font-bold mb-1">
                        {t('TASK_NAME')}
                    </label>
                    <input
                        className="w-full p-2 text-sm rounded-md border-2 border-gray-200 dark:border-dracula-comment dark:bg-dracula-bg dark:text-dracula-fg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                        type="text"
                        placeholder={t('NEW_TASK')}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        // Permite salvar apertando ENTER
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleAdd();
                        }}
                    />
                </div>

                {/* --- BOTÃO ADICIONAR --- */}
                <button 
                    className="bg-blue-500 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-dracula-purple dark:to-dracula-pink text-white px-4 py-2 rounded-md transition-colors font-bold shadow-md mb-[2px] h-[38px]"
                    onClick={handleAdd}
                >
                    +
                </button>
            </div>
        </div>  
    );
};