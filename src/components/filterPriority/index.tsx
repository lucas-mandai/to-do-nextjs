import { Filter } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  // CommandSeparator,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import useTask from '@/hooks/useTask';

export interface Priority {
  label: string;
  value: string;
}

const options: Priority[] = [
  {
    label: 'Low',
    value: 'low',
  },
  {
    label: 'Mid',
    value: 'mid',
  },
  {
    label: 'High',
    value: 'high',
  },
];

export default function FilterPriority() {
  const { selectedPriority, onSelectedPriority } = useTask();

  function handleSelectedPriority(opt: Priority, isSelect: boolean) {
    onSelectedPriority(opt, isSelect);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter size={14} className="mr-2" />
          Priority
          {selectedPriority.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedPriority.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedPriority.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedPriority.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) =>
                      selectedPriority.some(
                        (value) => value.value === option.value,
                      ),
                    )
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          {/* <CommandInput placeholder="Priority" /> */}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected =
                  selectedPriority?.some(
                    (value) => value.value === option.value,
                  ) ?? false;

                console.log('carregou');
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelectedPriority(option, isSelected)}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {/* {selectedPriority !== null && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => handleSelectedPriority(null, true)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )} */}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
