"use client";
import { Car } from "@prisma/client";
import { ListCarsProps } from "./ListCars.types";
import Image from "next/image";
import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react";
import { ModalAddReservation } from "@/components/shared/ModalAddReservation";
import { useLovedCars } from "@/hooks/use-loved-cars";
import {formatPrice} from "@/lib/formatPrice";

export const ListCars = (props: ListCarsProps) => {
  const { cars } = props;
  const {addLovedItem,lovedItems,removeLovedItem, } = useLovedCars();


  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 ">
      {cars.map((car: Car) => {
        const {
          priceDay,
          photo,
          cv,
          engine,
          id,
          people,
          name,
          transmission,
          type,
        } = car;

        const likedCar = lovedItems.some((item) => item.id === car.id)

         

        return (
         
          <div key={id} className="p-1 rounded-b-lg shadow-md hover:shadow-lg">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={photo}
                alt={name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="p-3">
              <div className="flex flex-col mb-3 gap-x-4">
                <p className="text-xl min-h-16 lg:min-h-fit">{name}</p>
                <p>{formatPrice(Number(priceDay))}/dia</p>
              </div>
              <p className="flex items-center">
                <Gem className="h-4 w-4 mr-2" strokeWidth={1} />
                {type}
              </p>
              <p className="flex items-center">
                <Wrench className="h-4 w-4 mr-2" strokeWidth={1} />
                {transmission}
              </p>
              <p className="flex items-center">
                <Users className="h-4 w-4 mr-2" strokeWidth={1} />
                {people}
              </p>
              <p className="flex items-center">
                <Fuel className="h-4 w-4 mr-2" strokeWidth={1} />
                {engine}
              </p>
              <p className="flex items-center">
                <Gauge className="h-4 w-4 mr-2" strokeWidth={1} />
                {cv}
              </p>
              <div className="flex items-center justify-center gap-x-3">
                <div className="flex-grow">
                  <ModalAddReservation car={car}/>
                </div>
                <Heart
                  className={`mt-2 cursor-pointer ${likedCar && "fill-black"}`}
                  onClick={likedCar ? ()=> removeLovedItem(car.id) : () => addLovedItem(car)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
