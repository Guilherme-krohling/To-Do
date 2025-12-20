import { useLanguage } from "../context/LanguageContext";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ title, id, children }) {
    const { t } = useLanguage();

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
            {/* Cabeçalho da Coluna */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-dracula-comment font-bold rounded-t-lg dark:text-dracula-purple">
                {t(title)}
            </div>

            {/* Área de Conteúdo (Cards):
               'flex-1' faz essa div crescer para ocupar o espaço disponível.
            */}
            <div className="p-4 space-y-2 flex-1">
                {children}
            </div>
        </div>
    );
};