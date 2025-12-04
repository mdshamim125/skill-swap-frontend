"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  const selectedItems = options.filter((o) => selected.includes(o.value));

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full flex justify-between"
          >
            <span className="truncate">
              {selectedItems.length > 0
                ? `${selectedItems.length} selected`
                : placeholder}
            </span>
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput placeholder="Search..." />

            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <div className="flex items-center justify-between w-full">
                    {option.label}
                    {selected.includes(option.value) && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* selected tags */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedItems.map((item) => (
            <div
              key={item.value}
              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md flex items-center gap-2"
            >
              {item.label}
              <X
                onClick={() => handleRemove(item.value)}
                className="h-4 w-4 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
