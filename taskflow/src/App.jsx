import Board from "./components/Board";
import Column  from "./components/Column";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";

export default function App() {
  const [tasks, setTasks] = useState(()=> {
    const salvo = localStorage.getItem("tarefa-salva");
    if (salvo) return JSON.parse(salvo);
    return [];
  });

  useEffect(() =>{
    localStorage.setItem("tarefa-salva", JSON.stringify(tasks));
  }, [tasks]);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";

  });

  useEffect(() => {
    if (theme=="dark"){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }
    //salva
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme(){
    setTheme(theme === "light" ? "dark":"light");
  };

  function adicionarTask(textoDigitado, priority){
    // Criar o objeto da nova tarefa
    const novaTarefa ={
      id: Math.random(),
      title: textoDigitado,
      status: "To-Do",
      priority: priority
    }
    
      //atualizar tasks e mantem o que ja tinha
      setTasks([...tasks, novaTarefa]);
  }

  function deletarTask(id){
    const tarefasAtualizadas= tasks.filter(task => task.id !== id);
    setTasks(tarefasAtualizadas);
  }

  function moverProximoStatus(id){
    const tarefasAtualizadas = tasks.map(task => {
      if(task.id === id){
        // let novoStatus; 
        // if(task.status === "To-Do"){
        //   novoStatus = "In Progress";
        // } else if(task.status === "In Progress"){
        //   novoStatus = "Done";
        // } else {
        //   novoStatus = task.status;
        // }

        ////Lógica simplificada
        const statusMap = {
            "To-Do": "In Progress",
            "In Progress": "Done",
            "Done": "Done"
        };
        // return {...task, status: novoStatus};
        return {...task, status: statusMap[task.status] || task.status};
      }
      return task;
    });
    setTasks(tarefasAtualizadas);
  }

  // Objeto de Pesos para usar na ordenação
  // High vale mais, então fica em cima
  const pesos = { High: 3, Medium: 2, Low: 1 };

  return (
    // MUDANÇA AQUI: Adicionei as classes do Dracula no final da string.
    // Isso NÃO apaga o 'min-h-screen', apenas adiciona cor de fundo e texto.
    <div className="min-h-screen transition-colors dark:bg-dracula-bg dark:text-dracula-fg">
      <Header mudarTema={toggleTheme}  darkMode={theme ==="dark"}/>

      <Board>
        <Column title="TO_DO">
           <AddTask add= {adicionarTask} />
           <div className="space-y-2">
               {
                 tasks.filter(task => task.status === "To-Do")
                 // AQUI A MÁGICA DA ORDENAÇÃO:
                 .sort((a, b) => {
                    // Compara o peso da tarefa B com a A (Ordem Decrescente)
                    return (pesos[b.priority] || 0) - (pesos[a.priority] || 0);
                 })
                 .map(task => (
                    <TaskCard 
                        key={task.id} 
                        title={task.title} 
                        priority={task.priority} 
                        deletar={() => deletarTask(task.id)} 
                        mover={() => moverProximoStatus(task.id)}
                    />
                 ))
               }
           </div>
        </Column>

        <Column title="IN_PROGRESS">
            {tasks
                .filter(task => task.status === "In Progress")
                // Ordenação na segunda coluna também
                .sort((a, b) => (pesos[b.priority] || 0) - (pesos[a.priority] || 0))
                .map(task => (
                    <TaskCard 
                        key={task.id} 
                        title={task.title} 
                        priority={task.priority} 
                        deletar={() => deletarTask(task.id)} 
                        mover={() => moverProximoStatus(task.id)} 
                    />
                ))
            }
        </Column>

        <Column title="DONE">
            {tasks
                .filter(task => task.status === "Done")
                // Ordenação na terceira coluna também
                .sort((a, b) => (pesos[b.priority] || 0) - (pesos[a.priority] || 0))
                .map(task => (
                    <TaskCard 
                        key={task.id} 
                        title={task.title} 
                        priority={task.priority} 
                        deletar={() => deletarTask(task.id)}
                        // Done não precisa de mover, mas mantive o padrão
                    />
                ))
            }
        </Column>
      </Board>
    </div>
  )
}