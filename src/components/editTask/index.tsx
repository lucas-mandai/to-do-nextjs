import { CalendarIcon, CheckIcon, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '../ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import useTask from '@/hooks/useTask';
import { ITask } from '@/app/page';

const prioritys = [
  { label: 'High', value: 'high' },
  { label: 'Mid', value: 'mid' },
  { label: 'Low', value: 'low' },
] as const;

const FormSchema = z.object({
  id: z.string(),
  dueDate: z.date({
    required_error: 'A due date is required.',
  }),
  description: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name must not be longer than 50 characters.' }),
  priority: z.enum(['high', 'mid', 'low']),
  // isCompleted: z.boolean().default(false),
});

type TaskFormData = z.infer<typeof FormSchema>;

interface EditTaskProp {
  task: ITask;
}
export default function EditTask({ task }: EditTaskProp) {
  const { addTask } = useTask();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: task.id,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    },
  });

  const { formState } = form;

  //   const desc = watch('description');
  //   console.log(desc);
  const { errors } = formState;
  console.log(errors);

  function onSubmit(data: TaskFormData) {
    addTask(data);
    //reset();
    toast('Task has been created');
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="reset">
            <SquarePen size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
            <DialogDescription>
              Edit your task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="hidden" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Describe your task" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Priority</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-[200px] justify-between',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? prioritys.find(
                                  (priority) => priority.value === field.value,
                                )?.label
                              : 'Select priority'}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search priority..." />
                          <CommandEmpty>No priority found.</CommandEmpty>
                          <CommandGroup>
                            {prioritys.map((priority) => (
                              <CommandItem
                                value={priority.label}
                                key={priority.value}
                                onSelect={() => {
                                  form.setValue('priority', priority.value);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    priority.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {priority.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
