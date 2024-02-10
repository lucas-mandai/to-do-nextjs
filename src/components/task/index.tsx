import { Badge } from '../ui/badge';
import DeleteConfirmation from '../deleteConfirmation';
import IsCompleted from '../isCompleted';
import useTask from '@/hooks/useTask';
import { format, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import EditTask from '../editTask';
import { ClipboardList } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';

export default function Task() {
  const { tasks, filterTasks, filteredTasks } = useTask();
  const [filterInput, setFilterInput] = useState('');

  const tasksCompleted = tasks.filter((t) => t.isCompleted === true);
  const existTasks = tasks.length > 0 ? false : true;

  function handleFilterTask(e: string) {
    setFilterInput(e);
    filterTasks(e);
  }

  return (
    <div className="mt-8 flex w-[32rem] flex-col items-center space-y-4">
      <div className="flex w-full justify-between gap-1">
        <Input
          disabled={existTasks}
          value={filterInput}
          placeholder="Filter tasks..."
          onChange={(event) => handleFilterTask(event.target.value)}
          className="max-w-xs"
        />
        <Button variant={'outline'}>Priority</Button>
        <Button variant={'outline'}>Completed</Button>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Tasks created</span>
          <div className="flex min-h-[17px] min-w-[17px] items-center justify-center rounded-full bg-primary text-[0.6rem] font-semibold text-primary-foreground">
            {tasks.length}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Completed</span>
          <div className="flex min-h-[17px] min-w-[17px] items-center justify-center rounded-full bg-primary text-[0.6rem] font-semibold text-primary-foreground">
            {tasksCompleted.length}
          </div>
        </div>
      </div>
      {tasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              'flex h-[5.6rem] w-full flex-col justify-between gap-y-2 rounded-sm bg-stone-100 p-4 dark:bg-stone-800',
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
        <div className="mt-12 flex flex-col items-center gap-1 text-center text-muted-foreground">
          <ClipboardList size={56} strokeWidth={1.2} />
          <p>You haven't created any tasks yet</p>
          <p>Create tasks and organize your to-do items</p>
        </div>
      )}
    </div>
  );
}
