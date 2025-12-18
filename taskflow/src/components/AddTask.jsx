import { useState } from "react";

export default function AddTask({add}) {
    const [title, setTitle] = useState ("");

    //por padrao começa low
    const [priority, setPriority] = useState("Low");

    return (  
        <div className="mb-4">
            <div className="flex gap-2 items-end">
                {/* GRUPO 1: PRIORIDADE */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 font-bold mb-1">Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-2 text-sm rounded-md border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors bg-white cursor-pointer"                          
                        >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                {/* GRUPO 2: NOME DA TAREFA */}
                {/* w-full faz esse grupo ocupar todo o espaço que sobrar */}
                <div className="flex flex-col w-full">
                    <label className="text-xs text-gray-500 font-bold mb-1">Name Task</label>
                    <input
                        className="w-full p-2 text-sm rounded-md border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                        type="text"
                        placeholder="New Task"
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
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-bold shadow-md"
                onClick={() => {
                    if(!title.trim()) return;
                    //chama o pai
                    add(title, priority);
                    //limpa o campo. RESET
                    setTitle("");
                }}>
                    +
                </button>
            </div>
        </div>  
    );
};
