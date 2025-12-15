export default function Column({title, children}) {
    return (  
        <div className="bg-white rounded-lg shadow-lg flex flex-col">

            {/* Cabeçalho */}
            <div className="px-4 py-3 border-b border-gray-100 font-bold rounded-t-lg">
                {title}
            </div>

            {/* tarefas */}
            <div className="p-4 space-y-2">
                {children}
            </div>
        </div>
        
    );
};
