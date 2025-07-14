"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TestSelect() {
  const [value, setValue] = useState("");
  console.log("Valor seleccionado:", value);
  return (
    <div className="p-10">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Elige una opción" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="uno">Uno</SelectItem>
          <SelectItem value="dos">Dos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 