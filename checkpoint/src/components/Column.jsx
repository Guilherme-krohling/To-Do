import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useDroppable } from "@dnd-kit/core";
import InlineAddTask from "./InlineAddTask";

export default function Column({ title, id, children, enableInlineAdd, onAdd }) {
    const { t } = useLanguage();
    const [isAdding, setIsAdding] = useState(false);

    /**
     * HOOK useDroppable:
     * Transforma este componente em uma "Zona de Aterrissagem".
     * Se soltar um card aqui, o App.jsx saberá graças ao 'id'.
     */
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (  
        <div 
            ref={setNodeRef} // Conecta o elemento ao sistema DND
            className="bg-white dark:bg-dracula-current rounded-lg shadow-lg flex flex-col transition-colors min-h-[150px]"
            // Adicionei min-h-[150px] acima. Isso garante que, se a coluna estiver vazia, 
            // ela ainda tenha tamanho para receber um card arrastado.
        >
            {/* Cabeçalho da Coluna com flex para o botão + */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-dracula-comment font-bold rounded-t-lg dark:text-dracula-purple flex justify-between items-center group">
                <span>{t(title)}</span>
                
                {enableInlineAdd && (
                    <button 
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-transparent text-gray-400 hover:text-indigo-600 dark:text-dracula-comment dark:hover:text-dracula-purple transition-colors p-1 rounded-md opacity-50 group-hover:opacity-100 border-none cursor-pointer"
                        title={t('ADD_TASK') || "Adicionar tarefa"}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Área de Conteúdo (Cards):
               'flex-1' faz essa div crescer para ocupar o espaço disponível.
            */}
            <div className="p-4 flex-1 flex flex-col min-h-0 relative">
                {enableInlineAdd && isAdding && (
                    <InlineAddTask 
                        onAdd={(title, priority) => {
                            onAdd(title, priority);
                            setIsAdding(false);
                        }} 
                        onCancel={() => setIsAdding(false)} 
                    />
                )}
                
                <div className="space-y-2 flex-1 relative">
                    {children}
                </div>
            </div>
        </div>
    );
};