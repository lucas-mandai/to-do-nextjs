import { TaskContext } from '@/contexts/TaskContext';
import { useContext } from 'react';

export default function useTask() {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error('Não está dentro do contexto');
  }

  return context;
}
