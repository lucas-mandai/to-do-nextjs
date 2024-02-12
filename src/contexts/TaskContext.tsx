import { ITask } from '@/app/page';
import { Status } from '@/components/filterStatus';

import { ReactNode, createContext, useEffect, useState } from 'react';

interface TaskContextProvideProps {
  children: ReactNode;
}

interface TaskItem extends ITask {
  isCompleted: boolean;
}

interface TaskContextType {
  tasks: TaskItem[];
  deleteTask: (id: string) => void;
  addTask: (task: ITask) => void;
  toogleIsCompleted: (id: string) => void;
  filterTasks: (input: string) => void;
  filteredTasks: TaskItem[];
  filterStatus: (status: string) => void;
  selectedStatus: Status | null;
  onSetSelectedStatus: (value: Status | null) => void;
}

export const TaskContext = createContext({} as TaskContextType);

export default function TaskContextProvider({
  children,
}: TaskContextProvideProps) {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>(tasks);

  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  useEffect(() => {
    const f = filter(selectedStatus);
    setFilteredTasks(f);
  }, [tasks, selectedStatus]);

  /* Quando alguma task for alterada eu preciso:
      >Verificar os filtros e em seguinda setar filteredTasks
  */
  function addTask(dataTask: ITask) {
    const taskExists = tasks.findIndex((task) => task.id === dataTask.id);

    if (taskExists !== -1) {
      //Tarefa já existe
      const updatedTasks = [...tasks];

      updatedTasks[taskExists].description = dataTask.description;
      updatedTasks[taskExists].dueDate = dataTask.dueDate;
      updatedTasks[taskExists].priority = dataTask.priority;
      setTasks(updatedTasks);
    } else {
      //Tarefa não existe
      setTasks([
        ...tasks,
        {
          id: dataTask.id,
          dueDate: dataTask.dueDate,
          description: dataTask.description,
          priority: dataTask.priority,
          isCompleted: false,
        },
      ]);
    }
  }

  function deleteTask(idTask: string) {
    const tasksFiltered = tasks.filter((t) => t.id !== idTask);
    setTasks(tasksFiltered);
  }

  function toogleIsCompleted(idTask: string) {
    const newTasks = tasks.map((t) => {
      if (t.id === idTask) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTasks(newTasks);
  }

  function filterTasks(input: string) {
    const filtered = tasks.filter((i) =>
      i.description.toLowerCase().includes(input.toLowerCase()),
    );

    setFilteredTasks(filtered);
  }

  function filterStatus(status: string | null) {
    const filteredStatus = tasks.filter((t) => {
      if (status === 'done') {
        return t.isCompleted;
      } else if (status === 'pending') {
        return !t.isCompleted;
      } else {
        return true;
      }
    });

    return filteredStatus;
  }

  function onSetSelectedStatus(value: Status | null) {
    setSelectedStatus(value);
  }

  function filter(status: Status | null) {
    const filtered = filterStatus(status?.value ?? '');

    return filtered;
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        deleteTask,
        addTask,
        toogleIsCompleted,
        filterTasks,
        filteredTasks,
        filterStatus,
        selectedStatus,
        onSetSelectedStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
