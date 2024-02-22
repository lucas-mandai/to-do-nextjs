'use client';
import { Badge } from '../ui/badge';
import DeleteConfirmation from '../deleteConfirmation';
import IsCompleted from '../isCompleted';
import useTask from '@/hooks/useTask';
import { format, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import EditTask from '../editTask';
import { ClipboardList } from 'lucide-react';

import FilterStatus from '../filterStatus';
import FilterPriority from '../filterPriority';
import FilterInput from '../filterInput';
import TaskInfo from '../taskInfo';

export default function Task() {
  const { tasks, filteredTasks } = useTask();

  return (
    <div className="mt-8 flex flex-col items-center md:w-[32rem]">
      <div className="mb-4 flex flex-wrap gap-2 md:w-full md:flex-nowrap md:justify-between md:gap-1">
        <FilterInput />
        <FilterPriority />
        <FilterStatus />
      </div>

      <TaskInfo tasks={tasks} />

      <div className="w-full space-y-4">
        {tasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                'flex min-h-[5.6rem] w-full flex-col justify-between gap-y-2 rounded-sm bg-stone-100 p-4 shadow-md dark:bg-stone-800',
                task.dueDate < startOfDay(new Date()) &&
                  'border border-destructive',
              )}
            >
              <div className="flex justify-between">
                <small className="text-muted-foreground">
                  Due date: {format(task.dueDate, 'dd-MM-yyyy')}
                </small>
                <Badge
                  className="capitalize"
                  variant={
                    task.priority === 'high'
                      ? 'destructive'
                      : task.priority === 'mid'
                        ? 'default'
                        : 'outline'
                  }
                >
                  {task.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <IsCompleted isChecked={task.isCompleted} idTask={task.id} />
                <p className={cn('w-5/6', task.isCompleted && 'line-through')}>
                  {task.description}
                </p>
                <DeleteConfirmation idTask={task.id} />
                <EditTask task={task} />
              </div>
            </div>
          ))
        ) : (
          <div className="mt-14 flex flex-col items-center gap-1 pb-7 text-center text-muted-foreground">
            <ClipboardList size={48} strokeWidth={1} />
            <p>You haven't created any tasks yet</p>
            <p>Create tasks and organize your to-do items</p>
          </div>
        )}
      </div>
    </div>
  );
}
