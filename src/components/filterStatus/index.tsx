import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useState } from 'react';
import useTask from '@/hooks/useTask';
import { Filter } from 'lucide-react';

export type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: 'done',
    label: 'Done',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
];

export default function FilterStatus() {
  const [open, setOpen] = useState(false);
  // const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const { selectedStatus, onSetSelectedStatus } = useTask();

  function handleStatusSelected(value: string | null) {
    onSetSelectedStatus(statuses.find((s) => s.value === value) || null);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          <Filter size={14} className="mr-2" />
          {selectedStatus ? <>{selectedStatus.label}</> : <>Status</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] p-0" align="start">
        <Command>
          {/* <CommandInput placeholder="Change status..." /> */}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={(value) => handleStatusSelected(value)}
                >
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedStatus && selectedStatus.value.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => handleStatusSelected(null)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
