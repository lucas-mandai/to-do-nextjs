import { ITask } from '@/app/page';
import { Priority } from '@/components/filterPriority';
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
  filteredTasks: TaskItem[];
  filterStatus: (status: string) => void;
  selectedStatus: Status | null;
  onSetSelectedStatus: (value: Status | null) => void;
  selectedPriority: Priority[];
  onSelectedPriority: (vPriority: Priority, vIsSelect: boolean) => void;
  filterInput: string;
  onSetFilterInput: (value: string) => void;
}

export const TaskContext = createContext({} as TaskContextType);

export default function TaskContextProvider({
  children,
}: TaskContextProvideProps) {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>(tasks);

  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<Priority[]>([]);
  const [filterInput, setFilterInput] = useState('');

  useEffect(() => {
    const f = filter();
    setFilteredTasks(f);
  }, [tasks, selectedStatus, selectedPriority, filterInput]);

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

  function filterTasks(task: TaskItem[]) {
    const filtered = task.filter((i) =>
      i.description.toLowerCase().includes(filterInput.toLowerCase()),
    );

    return filtered;
  }

  function filterStatus() {
    const filteredStatus = tasks.filter((t) => {
      if (selectedStatus !== null) {
        if (selectedStatus.value === 'done') {
          return t.isCompleted;
        } else if (selectedStatus.value === 'pending') {
          return !t.isCompleted;
        }
      }
      return true;
    });

    return filteredStatus;
  }

  function filterPriorities(task: TaskItem[]) {
    let matchingPriority = [];

    if (selectedPriority?.length === 0) {
      return task;
    } else {
      matchingPriority = task.filter((task) => {
        return selectedPriority?.some(
          (priority) => priority.value === task.priority,
        );
      });
    }

    return matchingPriority;
  }

  function onSetFilterInput(e: string) {
    setFilterInput(e);
  }

  function onSetSelectedStatus(value: Status | null) {
    setSelectedStatus(value);
  }

  function onSelectedPriority(opt: Priority, isSelect: boolean) {
    if (opt !== null) {
      if (isSelect) {
        setSelectedPriority(
          (prev) => prev?.filter((item) => item.value !== opt.value) ?? [],
        );
      } else {
        setSelectedPriority((prev) => [...(prev ?? []), opt]);
      }
    }
  }

  function filter() {
    const filteredS = filterStatus();
    const filteredP = filterPriorities(filteredS);
    const filterI = filterTasks(filteredP);

    return filterI;
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        deleteTask,
        addTask,
        toogleIsCompleted,
        filteredTasks,
        filterStatus,
        selectedStatus,
        onSetSelectedStatus,
        selectedPriority,
        onSelectedPriority,
        filterInput,
        onSetFilterInput,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
