import { Input } from '../ui/input';
import useTask from '@/hooks/useTask';

export default function FilterInput() {
  const { tasks, filterInput, onSetFilterInput } = useTask();
  const existTasks = tasks.length > 0 ? false : true;

  function handleFilterTask(e: string) {
    onSetFilterInput(e);
    // filterTasks(e);
  }

  return (
    <Input
      disabled={existTasks}
      value={filterInput}
      placeholder="Filter tasks..."
      onChange={(event) => handleFilterTask(event.target.value)}
      className="w-full md:max-w-xs"
    />
  );
}
