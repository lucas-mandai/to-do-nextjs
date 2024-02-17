import Greatings from '@/components/greatings';
import NewTask from '@/components/newTask';
import Task from '@/components/task';
import TaskContextProvider from '@/contexts/TaskContext';

export interface ITask {
  id: string;
  dueDate: Date;
  description: string;
  priority: 'high' | 'mid' | 'low';
  // isCompleted: boolean;
}

export default function Home() {
  return (
    <main className="container flex flex-col items-center py-10 ">
      <Greatings />
      <TaskContextProvider>
        <Task />
        <NewTask />
      </TaskContextProvider>
    </main>
  );
}
