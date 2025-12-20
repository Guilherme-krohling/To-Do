import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Imports do Dnd-Kit para tornar o item arrastável
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ id, title, priority, deletar, mover, atualizar }) {
    const { t } = useLanguage();
    
    // Estados locais para edição
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);

    /**
     * HOOK useSortable:
     * Conecta este componente ao sistema de Drag & Drop.
     * - attributes/listeners: Tornam o elemento "agarrável".
     * - setNodeRef: Diz ao dnd-kit qual elemento HTML é esse card.
     * - transform: Contém as coordenadas X/Y enquanto arrasta.
     */
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging 
    } = useSortable({ id: id });

    // Estilos aplicados dinamicamente durante o arraste
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1, // Fica transparente na lista original quando arrastado
        // CRUCIAL PARA MOBILE: Impede que o navegador faça scroll da página ao tentar arrastar o card
        touchAction: 'none' 
    };

    // Mapeamento de Cores por Prioridade
    const colors = {
        High: "border-red-500",
        Medium: "border-orange-500",
        Low: "border-blue-500"
    };
    const borderClass = colors[priority] || "border-gray-300";

    // Salva a edição ao apertar Enter ou clicar fora
    const handleSave = () => {
        if (editTitle.trim()) {
            atualizar(editTitle);
        } else {
            setEditTitle(title); // Reverte se estiver vazio
        }
        setIsEditing(false);
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners}
            className={`bg-white dark:bg-dracula-bg p-3 rounded-md shadow-sm border-l-4 ${borderClass} flex justify-between items-center group cursor-grab active:cursor-grabbing hover:shadow-md transition-all mb-2`}
        >
            {/* LADO ESQUERDO: TEXTO OU INPUT */}
            <div className="flex-1 mr-2"> 
                {isEditing ? (
                    <input 
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={handleSave} // Salva ao clicar fora
                        autoFocus
                        className="w-full text-sm p-1 rounded border border-blue-500 bg-white dark:bg-dracula-current dark:text-dracula-fg outline-none"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") {
                                setEditTitle(title);
                                setIsEditing(false);
                            }
                        }}
                    />
                ) : (
                    <h3 className="text-gray-700 dark:text-dracula-fg font-medium text-sm break-words">
                        {title}
                    </h3>
                )}
                
                <span className="text-xs text-gray-400 dark:text-dracula-comment capitalize">
                    {/* Traduz a prioridade transformando em maiúsculo (Low -> LOW -> Baixa) */}
                    {t(priority.toUpperCase())} {t('PRIORITY')} 
                </span>
            </div>
            
            {/* LADO DIREITO: BOTÕES DE AÇÃO */}
            <div className="flex items-center gap-2 pl-2">
                {!isEditing && (
                    <button 
                        className="p-1.5 rounded-md text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:text-white dark:hover:bg-dracula-current transition-colors"
                        onClick={() => setIsEditing(true)}
                        // IMPORTANTÍSSIMO: stopPropagation impede que o clique no botão inicie o arraste do card
                        onPointerDown={(e) => e.stopPropagation()} 
                        title="Edit"
                    >
                        {/* ÍCONE LÁPIS */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                            <path d="M410.3 23.1l68.5 68.5c21.3 21.3 21.3 55.8 0 77.1L166.5 481c-4.4 4.4-10.1 7.2-16.3 7.9L32.6 508.8c-17.7 2-33.1-13.4-31.1-31.1l19.9-117.6c.7-6.2 3.5-11.9 7.9-16.3L333.2 23.1c21.3-21.3 55.8-21.3 77.1 0zM124.1 408.8l-54.3 6.1 6.1-54.3L317.9 118.6 366.1 166.8 124.1 408.8z"/>
                        </svg>
                    </button>
                )}

                <button 
                        className="p-1.5 rounded-md text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:text-white dark:hover:bg-dracula-current transition-colors"
                        onClick={deletar}
                        onPointerDown={(e) => e.stopPropagation()}
                        title="Delete"
                >
                    {/* ÍCONE LIXEIRA */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current">
                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
                    </svg>
                </button>
                
                {mover && (
                    <button 
                            className="p-1.5 rounded-md text-white bg-blue-500 hover:bg-blue-600 dark:bg-gradient-to-r dark:from-dracula-purple dark:to-dracula-pink shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center" 
                            onClick={mover}
                            onPointerDown={(e) => e.stopPropagation()}
                            title="Move Next"
                    >
                        {/* ÍCONE SETA */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current">
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}