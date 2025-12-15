import Board from "./components/Board";
import Column  from "./components/Column";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />

      <Board>
        <Column title="To DO">
           <TaskCard title="Estudar React" priority="high" />
           <TaskCard title="tailwind" priority="medium" />
        </Column>

        <Column title="In Progress">
            <TaskCard title="site da bosta do F" priority="medium" />
        </Column>

        <Column title="Done">
            <TaskCard title="Provas semestrais" priority="low" />
        </Column>
      </Board>
    </div>
  )
}