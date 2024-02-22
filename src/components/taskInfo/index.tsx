import { TaskItem } from '@/contexts/TaskContext';

interface TaskProp {
  tasks: TaskItem[];
}

export default function TaskInfo({ tasks }: TaskProp) {
  const tasksCompleted = tasks.filter((t) => t.isCompleted === true);
  return (
    <div className="mb-4 flex w-full items-center justify-between">
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
  );
}
