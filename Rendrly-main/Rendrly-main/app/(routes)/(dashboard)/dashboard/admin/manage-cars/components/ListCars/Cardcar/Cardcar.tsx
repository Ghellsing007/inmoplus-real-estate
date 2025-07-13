"use client";
import Image from "next/image";
import { CardCarProps } from "./CardCard.types";
import { Fuel, Gauge, Gem, Pencil, Trash, Upload, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonEditCar } from "./ButtonEditCar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { formatPrice } from "@/lib/formatPrice";
import { formatDate } from "@/lib/formatDate";

export function Cardcar(props: CardCarProps) {  
  const { car } = props;
  const router = useRouter();

  function getFullDate() {
    const now = new Date();
    return formatDate(now);
  }

  const deleteCar = async () => {
    try {
      await axios.delete(`/api/car/${car.id}`);
      router.refresh();

      toast("Car deleted ❌", {
        description: getFullDate(),
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });

      router.refresh();
    } catch (error) {
      toast("Something went wrong", {
        // description: error instanceof Error ? error.message : "Unknown error",
        style: { backgroundColor: "#f87171", color: "white" }, // rojo suave
      });
    }
  };

  const handlePublishCar = async (publish: boolean) => {
    try {
      await axios.patch(`/api/car/${car.id}` , {isPublish : publish});
      if(publish){
        toast("Car published ✅", {
          description: getFullDate(),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }else{
        toast("Car unpublished ❌", {
          description: getFullDate(),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }       
      router.refresh();
    } catch (error) {
      toast("Something went wrong", {
        // description: error instanceof Error ? error.message : "Unknown error",
        style: { backgroundColor: "#f87171", color: "white" }, // rojo suave
      });
    }
  };


  return (
    <div className="relative p-1 bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="w-full aspect-[3/2] relative overflow-hidden rounded-lg">
        <Image
          src={car.photo.replace("/cars", "")}
          alt={car.name}
          fill
          className="object-cover"
        />
      </div>

      {car.isPublish ? (
        <p className="absolute top-0 right-0 w-full p-1 text-center text-white bg-green-700 rounded-t-lg">
          Published
        </p>
      ) : (
        <p className="absolute top-0 left-0 right-0 w-full p-1 text-center text-white bg-red-300 rounded-t-lg">
          Not Published
        </p>
      )}

      <div className="relative p-3">
        <div className="flex flex-col mb-3 gap-x-4">
          <p className="text-xl min-h-16 lg:min-h-fit">{car.name}</p>
          <p>{formatPrice(Number(car.priceDay))}/dia</p>
        </div>
        <div className="grid md:grid-cols-2 gap-x-4">
          <p className="flex items-center">
            <Gem className="h-4 w-4 mr-2" strokeWidth={1} />
            {car.type}
          </p>
          <p className="flex items-center">
            <Wrench className="h-4 w-4 mr-2" strokeWidth={1} />
            {car.transmission}
          </p>
          <p className="flex items-center">
            <Users className="h-4 w-4 mr-2" strokeWidth={1} />
            {car.people}
          </p>
          <p className="flex items-center">
            <Fuel className="h-4 w-4 mr-2" strokeWidth={1} />
            {car.engine}
          </p>
          <p className="flex items-center">
            <Gauge className="h-4 w-4 mr-2" strokeWidth={1} />
            {car.cv}
          </p>
        </div>
        <div className="flex justify-between mt-3 gap-x-0.5">
          <Button variant="outline" onClick={deleteCar}>
            Delete
            <Trash className="4- h-4 ml-2" />
          </Button>    
          <ButtonEditCar carData={car}/>     
        </div>

        

        {car.isPublish ? (
          <Button
            className="w-full mt-3"
            variant="outline"
            onClick={() => handlePublishCar(false)}
          >
            Unpublish
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            className="w-full mt-3"
            onClick={() => handlePublishCar(true)}
          >
            Publish
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
