import { useEffect, useState } from "react";
import Board from "./Board";
import Column from "./Column";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import GlobalAddTask from "./GlobalAddTask";
import { sortTasks } from "../utils/sortTasks";

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

export default function GenericBoard({ storageKey, columns, allowAddInAllColumns = false, enableInlineAdd = false, gridCols = 3 }) {
  // Lista de Tarefas lendo do LocalStorage usando a storageKey dinâmica
  const [tasks, setTasks] = useState(() => {
    const salvo = localStorage.getItem(storageKey);
    if (salvo) return JSON.parse(salvo);
    return [];
  });

  const [activeId, setActiveId] = useState(null);

  // Efeito para salvar no localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  // Sensores de DnD
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Funções de Negócio
  function adicionarTask(textoDigitado, priority, colunaDestinoId) {
    const novaTarefa = {
      id: Math.random(), 
      title: textoDigitado,
      status: colunaDestinoId,
      priority: priority 
    }
    setTasks([...tasks, novaTarefa]);
  }

  function deletarTask(id) {
    const tarefasAtualizadas = tasks.filter(task => task.id !== id);
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

  function moverProximoStatus(id) {
    const tarefasAtualizadas = tasks.map(task => {
      if (task.id === id) {
        // Encontra o índice da coluna atual da tarefa
        const currentIndex = columns.findIndex(col => col.id === task.status);
        if (currentIndex !== -1 && currentIndex < columns.length - 1) {
          return { ...task, status: columns[currentIndex + 1].id };
        }
      }
      return task;
    });
    setTasks(tarefasAtualizadas);
  }

  // Handlers Drag & Drop
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const taskId = active.id;
    const overId = over.id; 

    let novaColunaStatus = "";

    // Verifica se soltou direto na coluna (overId é o id de uma coluna configurada)
    if (columns.find(col => col.id === overId)) {
        novaColunaStatus = overId;
    } 
    // Caso solte em cima de outra tarefa
    else {
        const tarefaDestino = tasks.find(t => t.id === overId);
        if (tarefaDestino) {
            novaColunaStatus = tarefaDestino.status;
        }
    }

    if (novaColunaStatus) {
        setTasks((prevTasks) => 
            prevTasks.map(task => {
                if (task.id === taskId) {
                    if (task.status !== novaColunaStatus) {
                        return { ...task, status: novaColunaStatus };
                    }
                }
                return task;
            })
        );
    }
  }

  const activeTask = tasks.find(task => task.id === activeId);

  return (
    <div className="flex flex-col w-full min-h-full">
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners} 
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {/* Formulário Global para Múltiplas Colunas */}
        {allowAddInAllColumns && !enableInlineAdd && (
            <div className="px-4 pt-4 shrink-0 w-full">
                <GlobalAddTask add={adicionarTask} columns={columns} />
            </div>
        )}

        <Board gridCols={gridCols}>
          {columns.map((col, idx) => (
            <Column 
                key={col.id} 
                title={col.title} 
                id={col.id}
                enableInlineAdd={enableInlineAdd}
                onAdd={(texto, prioridade) => adicionarTask(texto, prioridade, col.id)}
            >
              {/* O formulário de Adicionar local aparece APENAS na primeira coluna se allowAddInAllColumns for falso e enableInlineAdd for falso */}
              {(!allowAddInAllColumns && !enableInlineAdd && idx === 0) && (
                  <AddTask add={(texto, prioridade) => adicionarTask(texto, prioridade, col.id)} />
              )}
              <div className="space-y-2">
              {sortTasks(tasks.filter(task => task.status === col.id))
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
              ))}
            </div>
          </Column>
        ))}
      </Board>

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
  );
}
