import { useState } from "react";

export default function AddTask({add}) {
    const [title, setTitle] = useState ("");

    return (  
        <div>
            <input
                type="text"
                placeholder="Tarefa"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            
            <button onClick={() => {
                //chama o pai
                add(title);
                //limpa o campo. RESET
                setTitle("");
             }}>
                Adicionar
            </button>
        </div>  
    );
};
