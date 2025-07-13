"use client";

import { useLovedCars } from "@/hooks/use-loved-cars";
import { Car } from "@prisma/client";
import { Fuel, Gem, Heart, Users, Wrench, Gauge } from "lucide-react";
import Image from "next/image";
import { ModalAddReservation } from "@/components/shared/ModalAddReservation";
import {formatPrice} from "@/lib/formatPrice";

export function ListLovedCars() {
  const { lovedItems, removeLovedItem } = useLovedCars();

  return (
    <>
      {lovedItems.length === 0 ? (
        <h2>Aún no dispones de coches que te gusten</h2>
      ) : (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {lovedItems.map((car: Car) => {
            const {
              priceDay,
              photo,
              name,
              type,
              transmission,
              people,
              engine,
              id,
              cv,
            } = car;

            return (
              <div
                className="p-1 rounded-lg shadow-md hover:shadow-lg"
                key={id}
              >
                <div className="relative w-full aspect-[3/2]">
                  <Image
                    src={photo}
                    alt=""
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
                      <ModalAddReservation car={car} />
                    </div>
                    <Heart
                      className="mt-2 cursor-pointer fill-black"
                      onClick={() => removeLovedItem(car.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
