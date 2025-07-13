"use client";

import { Car } from "@prisma/client";
import { useEffect, useState } from "react";

import { FilterAndListCarsProps } from "./FilterAndListCars.types";
import { ListCars } from "../ListCars";
import { FilterCars } from "../FiltersCars";

export function FilterAndListCars(props: FilterAndListCarsProps) {
  const { cars } = props;
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [filters, setFilters] = useState({
    type: "",
    transmission: "",
    engine: "",
    people: "",
  });

  useEffect(() => {
    let filtered = cars;

    if (filters.type) {
      filtered = filtered.filter((car) =>
        car.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.transmission) {
      filtered = filtered.filter((car) =>
        car.transmission.toLowerCase().includes(filters.transmission.toLowerCase())
      );
    }
    if (filters.people) {
      filtered = filtered.filter((car) =>
        car.people.toLowerCase().includes(filters.people.toLowerCase())
      );
    }

    if (filters.engine) {
      filtered = filtered.filter((car) =>
        car.engine.toLowerCase().includes(filters.engine.toLowerCase())
      );
    }

    setFilteredCars(filtered);
  }, [filters, cars]);

  const handleFilterChange = (filterName: string, filterValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      transmission: "",
      engine: "",
      people: "",
    });
  };

  return (
    <div>
      <FilterCars setFilters={handleFilterChange} filters={filters} clearFilters={clearFilters}/>
      <ListCars cars={filteredCars} />
    </div>
  ); 
}
