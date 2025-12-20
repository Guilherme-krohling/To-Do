import { useEffect, useState } from "react";

// Componentes do Sistema
import Board from "./components/Board";
import Column  from "./components/Column";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import AddTask from "./components/AddTask";

// Imports do Drag & Drop (DND-KIT)
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay 
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function App() {
  
  // --- ESTADOS GLOBAIS ---
  
  // Lista de Tarefas (Inicializa lendo do LocalStorage)
  const [tasks, setTasks] = useState(()=> {
    const salvo = localStorage.getItem("tarefa-salva");
    if (salvo) return JSON.parse(salvo);
    return [];
  });

  // Estado para guardar o ID do item que está sendo arrastado visualmente (Overlay)
  const [activeId, setActiveId] = useState(null);

  // Estado do Tema (Dark/Light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // --- EFEITOS (Side Effects) ---

  // Salva no LocalStorage sempre que 'tasks' mudar
  useEffect(() =>{
    localStorage.setItem("tarefa-salva", JSON.stringify(tasks));
  }, [tasks]);

  // Aplica a classe 'dark' no HTML quando o tema mudar
  useEffect(() => {
    if (theme==="dark"){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- CONFIGURAÇÃO DOS SENSORES (DRAG & DROP) ---
  // Necessário para diferenciar clique de arraste, especialmente no mobile.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // O usuário precisa arrastar 8px para o movimento começar (evita cliques acidentais)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates, // Permite acessibilidade via teclado
    })
  );

  // --- FUNÇÕES DE LÓGICA DE NEGÓCIO ---

  function toggleTheme(){
    setTheme(theme === "light" ? "dark":"light");
  };

  function adicionarTask(textoDigitado, priority){
    const novaTarefa ={
      id: Math.random(), 
      title: textoDigitado,
      status: "To-Do",
      priority: priority 
    }
    setTasks([...tasks, novaTarefa]);
  }

  function deletarTask(id){
    const tarefasAtualizadas= tasks.filter(task => task.id !== id);
    setTasks(tarefasAtualizadas);
  }

  function atualizarTask(id, novoTitulo) {
    const tarefasAtualizadas = tasks.map(task => {
      if (task.id === id) {
        return { ...task, title: novoTitulo };
      }
      return task;
    });
    setTasks(tarefasAtualizadas);
  }

  function moverProximoStatus(id){
    const tarefasAtualizadas = tasks.map(task => {
      if(task.id === id){
        const statusMap = {
            "To-Do": "In Progress",
            "In Progress": "Done",
            "Done": "Done"
        };
        return {...task, status: statusMap[task.status] || task.status};
      }
      return task;
    });
    setTasks(tarefasAtualizadas);
  }

  // --- HANDLERS DO DRAG & DROP ---

  // Disparado quando começa a arrastar (Grava quem é o item ativo)
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  // Disparado quando solta o card
  function handleDragEnd(event) {
    const { active, over } = event;

    // Limpa o estado visual do "fantasma"
    setActiveId(null);

    // Se soltou fora de qualquer zona válida, cancela
    if (!over) return;

    const taskId = active.id;
    const overId = over.id; 

    let novaColunaStatus = "";

    // Cenário 1: Soltou diretamente sobre uma Coluna (vazia ou não)
    if (["To-Do", "In Progress", "Done"].includes(overId)) {
        novaColunaStatus = overId;
    } 
    // Cenário 2: Soltou sobre outra Tarefa
    // Precisamos descobrir em qual coluna essa tarefa de destino está
    else {
        const tarefaDestino = tasks.find(t => t.id === overId);
        if (tarefaDestino) {
            novaColunaStatus = tarefaDestino.status;
        }
    }

    // Se identificamos uma nova coluna válida, atualizamos o status da tarefa
    if (novaColunaStatus) {
        setTasks((prevTasks) => 
            prevTasks.map(task => {
                if (task.id === taskId) {
                    // Só atualiza se realmente mudou de coluna
                    if (task.status !== novaColunaStatus) {
                        return { ...task, status: novaColunaStatus };
                    }
                }
                return task;
            })
        );
    }
  }

  // Helper para o Overlay: Encontra os dados da tarefa sendo arrastada
  const activeTask = tasks.find(task => task.id === activeId);

  // Pesos para ordenação automática (High primeiro)
  const pesos = { High: 3, Medium: 2, Low: 1 };

  return (
    <div className="min-h-screen transition-colors dark:bg-dracula-bg dark:text-dracula-fg">
      <Header mudarTema={toggleTheme} darkMode={theme === "dark"} />
      
      {/* Provider do DND envolve toda a área arrastável */}
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners} 
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <Board>
          {/* COLUNA TO DO */}
          <Column title="TO_DO" id="To-Do"> 
             <AddTask add= {adicionarTask} />
             <div className="space-y-2">
                 {
                   tasks.filter(task => task.status === "To-Do")
                   .sort((a, b) => (pesos[b.priority] || 0) - (pesos[a.priority] || 0))
                   .map(task => (
                      <TaskCard 
                          key={task.id} 
                          id={task.id} 
                          title={task.title} 
                          priority={task.priority} 
                          deletar={() => deletarTask(task.id)} 
                          mover={() => moverProximoStatus(task.id)}
                          atualizar={(novoTitulo) => atualizarTask(task.id, novoTitulo)}
                      />
                   ))
                 }
             </div>
          </Column>

          {/* COLUNA IN PROGRESS */}
          <Column title="IN_PROGRESS" id="In Progress">
              {tasks
                  .filter(task => task.status === "In Progress")
                  .sort((a, b) => (pesos[b.priority] || 0) - (pesos[a.priority] || 0))
                  .map(task => (
                      <TaskCard 
                          key={task.id} 
                          id={task.id}
                          title={task.title} 
                          priority={task.priority} 
                          deletar={() => deletarTask(task.id)} 
                          mover={() => moverProximoStatus(task.id)} 
                          atualizar={(novoTitulo) => atualizarTask(task.id, novoTitulo)}
                      />
                  ))
              }
          </Column>

          {/* COLUNA DONE */}
          <Column title="DONE" id="Done">
              {tasks
                  .filter(task => task.status === "Done")
                  .sort((a, b) => (pesos[b.priority] || 0) - (pesos[a.priority] || 0))
                  .map(task => (
                      <TaskCard 
                          key={task.id} 
                          id={task.id}
                          title={task.title} 
                          priority={task.priority} 
                          deletar={() => deletarTask(task.id)}
                          atualizar={(novoTitulo) => atualizarTask(task.id, novoTitulo)}
                      />
                  ))
              }
          </Column>
        </Board>

        {/* OVERLAY: A "cópia" do card que segue o mouse */}
        <DragOverlay>
            {activeId && activeTask ? (
                <div className="opacity-90 rotate-3 cursor-grabbing shadow-2xl pointer-events-none">
                    <TaskCard 
                        id={activeId}
                        title={activeTask.title} 
                        priority={activeTask.priority}
                    />
                </div>
            ) : null}
        </DragOverlay>

      </DndContext>
    </div>
  )
}