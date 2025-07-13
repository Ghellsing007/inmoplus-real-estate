"use client";

import { ListCarsProps } from "./ListCars.type";
import {
  Fuel,
  Gem,
  Heart,
  Users,
  Wrench,
  Gauge,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { useAuth } from "@clerk/nextjs";
import { Car } from "@prisma/client";
import Link from "next/link";
import { ModalAddReservation } from "@/components/shared/ModalAddReservation";
import { SkeletonCars } from "@/components/shared/SkeletonCars";

export function ListCars(props: ListCarsProps) {
  const { cars } = props;
  const { userId } = useAuth();
  const { addLovedItem, lovedItems, removeLovedItem } = useLovedCars();

  if (!cars) {
    return <SkeletonCars/>
  }

  return (
    <>
      <div className="text-lg md:text-xl lg:text-2xl text-center p-4">
        {cars.length === 0 && (
          <p>No se han encontrado vehiculos con estos filtros</p>
        )}
      </div>

      <div className="m-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {cars.map((car: Car) => {
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
          const likedCar = lovedItems.some((item) => item.id === car.id);
          return (
            <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={photo}
                  alt=""
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex flex-col mb-3 gap-x-4">
                  <p className="text-xl min-h-fit">{name}</p>
                  <p>RD$ {priceDay}</p>
                </div>
                <div>
                  <p className="flex items-center">
                    <Gem className="w-4 h-4 mr-2" strokeWidth={1} />
                    {type}
                  </p>
                  <p className="flex items-center">
                    <Wrench className="w-4 h-4 mr-2" strokeWidth={1} />
                    {transmission}
                  </p>

                  <p className="flex items-center">
                    <User className="w-4 h-4 mr-2" strokeWidth={1} />
                    {people}
                  </p>

                  <p className="flex items-center">
                    <Fuel className="w-4 h-4 mr-2" strokeWidth={1} />
                    {engine}
                  </p>

                  <p className="flex items-center">
                    <Gauge className="w-4 h-4 mr-2" strokeWidth={1} />
                    {cv}
                  </p>

                  {userId ? (
                    <div className="flex items-center justify-center gap-x-3">
                      <div className="flex-grow">
                        <ModalAddReservation car={car} />
                      </div>
                      <Heart
                        className={`mt-2 cursor-pointer ${
                          likedCar && "fill-black"
                        }`}
                        onClick={
                          likedCar
                            ? () => removeLovedItem(car.id)
                            : () => addLovedItem(car)
                        }
                      />
                    </div>
                  ) : (
                    <div className="w-full mt-2 text-center">
                      <Link href={"/sign-in"}>
                        <Button variant={"outline"} className="w-full whitespace-normal h-auto py-2">
                          Inicia sesión para reservar
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
