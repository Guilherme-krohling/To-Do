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
    // {id: 1, title: "task1", status: "To-Do", priority: "high"},
    // {id: 2, title: "task2", status: "Done", priority: "low"},
    // {id: 3, title: "taske", status: "In Progress", priority: "medium"}
  });

  useEffect(() =>{
    localStorage.setItem("tarefa-salva", JSON.stringify(tasks));
  }, [tasks]);

  function adicionarTask(textoDigitado){
    // Criar o objeto da nova tarefa
    const novaTarefa ={
      id: Math.random(),
      title: textoDigitado,
      status: "To-Do",
      priority: "low"
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
        let novoStatus; 
        if(task.status === "To-Do"){
          novoStatus = "In Progress";
        } else if(task.status === "In Progress"){
          novoStatus = "Done";
        } else {
          novoStatus = task.status;
        }
        return {...task, status: novoStatus};
      }
      return task;
    });
    setTasks(tarefasAtualizadas);
  }

  return (
    <div className="min-h-screen">
      <Header />

      <Board>
        <Column title="To DO">
           {/* Componente de Adicionar no topo da coluna */}
            <AddTask add= {adicionarTask} />

            <div className="space-y-2">
                {
                  tasks.filter(task => task.status === "To-Do")
                  .map(task => (<TaskCard key={task.id} title={task.title} priority={task.priority} 
                    deletar={() => deletarTask(task.id)} mover={() => moverProximoStatus(task.id)}/>))
                }
            </div>
        </Column>

        <Column title="In Progress">
            {/* <TaskCard title="site da bosta do F" priority="medium" /> */}
            {tasks.filter(task => task.status === "In Progress").map(task => <TaskCard key={task.id} title={task.title} priority={task.priority} 
            deletar={() => deletarTask(task.id)} mover={() => moverProximoStatus(task.id)} />)}
            
        </Column>

        <Column title="Done">
            {/* <TaskCard title="Provas semestrais" priority="low" /> */}
            {tasks.filter(task => task.status === "Done").map(task => <TaskCard key={task.id} title={task.title} priority={task.priority} deletar={() => deletarTask(task.id)}/>)}
        </Column>
      </Board>
    </div>
  )
}