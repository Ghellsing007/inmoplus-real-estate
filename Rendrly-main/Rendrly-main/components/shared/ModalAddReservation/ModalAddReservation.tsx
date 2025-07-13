import { ModalAddReservationProps } from "./ModalAddReservation.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Car } from "@prisma/client";
import { CalendarSelector } from "./CalendarSelector";
import {addDays} from "date-fns"
import { useState } from "react";
import { DateRange } from "react-day-picker";
import axios from "axios";
import { toast } from "sonner";


export function ModalAddReservation(props: ModalAddReservationProps) {
  const {car} = props
  const [dateSelected, setdateSelected] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  const onReserveCar = async (car: Car, dateSelected: DateRange | undefined) => {
    try {
      if (!dateSelected?.from || !dateSelected?.to) {
        toast.error("Por favor seleccione un rango de fechas válido");
        return;
      }

      const response = await axios.post("/api/checkout", {
        carId: car.id,
        priceDay: Number(car.priceDay),
        startDate: dateSelected.from.toISOString(),
        endDate: dateSelected.to.toISOString(),
        carName: car.name
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
        toast.success("Reserva iniciada ✅");
      } else {
        toast.error("Error al procesar la reserva");
      }
    } catch (error) {
      console.error("[RESERVE_CAR]", error);
      toast.error("Error al procesar la reserva");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full mt-3">Reservar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Seleccione las fechas en la que desee alquilar el vehiculo</AlertDialogTitle>
          <div className="mt-4">
            <CalendarSelector setDateSelected={setdateSelected} carPriceDay={car.priceDay}/>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>onReserveCar(car,dateSelected)}>Reservar vehiculo</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> 
  );
}
