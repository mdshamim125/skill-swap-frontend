/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";



export default function FilterSelect({ name, defaultValue, options }: any) {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <>
      <input type="hidden" name={name} value={value} />

      <Select value={value} onValueChange={(v) => setValue(v)}>
        <SelectTrigger className="w-full md:w-[250px]">
          <SelectValue placeholder={name} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt:any) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
