import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiltersCarsProps } from "./FilterCars.type";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FilterCars(props: FiltersCarsProps) {
  const { setFilters, clearFilters, filters } = props;

  const handleFilter = (filter: string, value: string) => {
    setFilters(filter, value);
  };

  return (
    <div className="mt-5 mb-8 flex flex-wrap justify-center gap-4 px-4">
      <Select
        onValueChange={(value) => handleFilter("type", value)}
        value={filters.type}
      >
        <SelectTrigger className="w-[calc(50%-8px)] sm:w-[180px]">
          <SelectValue placeholder="Tipo de vehiculo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipo de vehiculo</SelectLabel>
            <SelectItem value="sedan">Sedán</SelectItem>
            <SelectItem value="suv">Suv</SelectItem>
            <SelectItem value="coupe">Coupé</SelectItem>
            <SelectItem value="familiar">Familiar</SelectItem>
            <SelectItem value="luxe">De luxe</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilter("transmission", value)} value={filters.transmission}>
        <SelectTrigger className="w-[calc(50%-8px)] sm:w-[180px]">
          <SelectValue placeholder="Cambios de marcha" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cambios de marcha</SelectLabel>
            <SelectItem value="automatic">Automatic</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilter("engine", value)} value={filters.engine}>
        <SelectTrigger className="w-[calc(50%-8px)] sm:w-[180px]">
          <SelectValue placeholder="Tipo de Motor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipo de Motor</SelectLabel>
            <SelectItem value="gasoil">Gasoil</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
            <SelectItem value="hybrid">Hibrido</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilter("people", value)} value={filters.people}>
        <SelectTrigger className="w-[calc(50%-8px)] sm:w-[180px]">
          <SelectValue placeholder="Personas" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Personas</SelectLabel>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="7">7</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={clearFilters} className="w-full sm:w-auto">
        Remove
        <Trash className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
