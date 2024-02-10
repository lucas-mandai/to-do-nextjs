'use client';

import Greatings from '@/components/greatings';
import NewTask from '@/components/newTask';
import Task from '@/components/task';
import TaskContextProvider from '@/contexts/TaskContext';
import { Suspense } from 'react';

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
      <Suspense
        fallback={<h1 className="text-destructive">Loading Greatings...</h1>}
      >
        <Greatings />
      </Suspense>
      <TaskContextProvider>
        <Task />
        <NewTask />
      </TaskContextProvider>
    </main>
  );
}
