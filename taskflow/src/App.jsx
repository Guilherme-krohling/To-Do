import Board from "./components/Board";
import Column  from "./components/Column";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import { useState } from "react";
import AddTask from "./components/AddTask";

export default function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: "task1", status: "To-Do", priority: "high"},
    {id: 2, title: "task2", status: "Done", priority: "low"},
    {id: 3, title: "taske", status: "In Progress", priority: "medium"}
  ]);

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

  return (
    <div className="min-h-screen">
      <Header />

      <Board>
        <Column title="To DO">
           {/* Componente de Adicionar no topo da coluna */}
            <AddTask add= {adicionarTask} />

            <div className="mt-4">
                {
                  tasks.filter(task => task.status === "To-Do")
                  .map(task => (<AddTask key={task.id} title={task.title} priority={task.priority}/>))
                }
            </div>
        </Column>

        <Column title="In Progress">
            {/* <TaskCard title="site da bosta do F" priority="medium" /> */}
            {tasks.filter(task => task.status === "In Progress").map(task => <TaskCard key={task.id} title={task.title} priority={task.priority} />)}
        </Column>

        <Column title="Done">
            {/* <TaskCard title="Provas semestrais" priority="low" /> */}
            {tasks.filter(task => task.status === "Done").map(task => <TaskCard key={task.id} title={task.title} priority={task.priority} />)}
        </Column>
      </Board>
    </div>
  )
}