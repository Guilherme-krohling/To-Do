import { useState } from "react";

export default function AddTask({add}) {
    const [title, setTitle] = useState ("");

    return (  
        <div className="mb-4">
            <div className="flex gap-2">
                <input
                    className="w-full p-2 text-sm rounded-md border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                    type="text"
                    placeholder="Nova Tarefa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter"){
                            if(!title.trim()) return;
                            add(title);
                            setTitle("");
                        }
                    }}
                />
                
                <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-bold shadow-md"
                onClick={() => {
                    if(!title.trim()) return;
                    //chama o pai
                    add(title);
                    //limpa o campo. RESET
                    setTitle("");
                }}>
                    +
                </button>
            </div>
        </div>  
    );
};
