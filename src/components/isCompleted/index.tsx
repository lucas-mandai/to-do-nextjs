'use client';

import useTask from '@/hooks/useTask';
import { Checkbox } from '../ui/checkbox';

interface IsCompletedProps {
  isChecked: boolean;
  idTask: string;
}

export default function IsCompleted({ isChecked, idTask }: IsCompletedProps) {
  const { toogleIsCompleted } = useTask();

  function isCompletedToggle(id: string) {
    toogleIsCompleted(id);
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={isChecked}
        onCheckedChange={() => isCompletedToggle(idTask)}
      />
    </div>
  );
}
