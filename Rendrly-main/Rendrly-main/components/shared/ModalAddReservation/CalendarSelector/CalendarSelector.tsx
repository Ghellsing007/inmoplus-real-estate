"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarSelectorProps } from "./CalendarSelector.type";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {formatPrice} from "@/lib/formatPrice"

export function CalendarSelector(props: CalendarSelectorProps) {
  const { setDateSelected, className, carPriceDay, date: propDate, initialDate } = props;
  const [date, setDate] = useState<DateRange | undefined>(propDate || initialDate);

  useEffect(() => {
    setDateSelected(date);
  }, [date, setDateSelected]);

  useEffect(() => {
    // Si initialDate cambia (ej. al borrar filtros), resetear el estado interno de la fecha
    if (initialDate !== undefined) {
      setDate(initialDate);
    }
  }, [initialDate]);

  const calculateDaysBetween = (from: Date, to: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffInTime = to.getTime() - from.getTime();
    return Math.round(diffInTime / oneDay);
  };

  const daysBetween =
    date?.from && date?.to ? calculateDaysBetween(date.from, date.to) : 0;

  const totalAmount = daysBetween * Number(carPriceDay);

  return (
    <div className={cn("grid gap-2", className)}>
      {carPriceDay && date?.from && date?.to && (
        <div className="space-y-4">
          <div className="mt-4 text-lg text-black">
            Días totales: {daysBetween}
          </div>
          <div className="mt-4 text-md">
            Precio total: {formatPrice(totalAmount)} (Imp.incluidos) 
          </div>
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2"/>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {""}
                  {format(date.to, "LLL dd, y")}                  
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Seleccionar fechas</span>
            )}
          </Button>               
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0" 
          align="center" 
          sideOffset={-47}
          avoidCollisions={false}
        > 
          <Calendar
            initialFocus 
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
