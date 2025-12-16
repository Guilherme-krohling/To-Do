export default function TaskCard({ title, priority, deletar }) {
    // Mapa de cores baseado na prioridade
    const colors = {
        high: "border-red-500",
        medium: "border-orange-500",
        low: "border-blue-500"
    };

    // Se vier uma prioridade que não existe, usa cinza por padrão
    const borderClass = colors[priority] || "border-gray-300";

    return (
        <div className={`bg-white p-3 rounded-md shadow-sm border-l-4 ${borderClass} flex justify-between items-center group cursor-pointer hover:shadow-md transition-all`}>
            <div>
                <h3 className="text-gray-700 font-medium text-sm">{title}</h3>
                <span className="text-xs text-gray-400 capitalize">{priority} priority</span>
            </div>
            
            {/* Botão de lixeira que só aparece quando passa o mouse (group-hover) */}
            <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={deletar}
                    // Chama a função deletarTask passando o ID da tarefa
                    // deletarTask(id);
            >
               🗑️
            </button>
        </div>
    );
}