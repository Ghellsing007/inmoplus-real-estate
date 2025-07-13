"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { dataBrands } from "./SliderBrands.data";
import { Reveal } from "@/components/shared/Reveal";

export function SliderBrands() {
  return (
    <Reveal
      position="bottom"
      className="flex gap-x-20 justify-center lg:pb-20 mt-5 mb-10 "
    >
      <Carousel
        className="w-full max-w-6xl mx-auto"
        plugins={[
          Autoplay({
            delay: 2500,
          }),
        ]}
      >
        <CarouselContent>
          {dataBrands.map(({ url }) => (
            <CarouselItem
              key={url}
              className="basis-4/12 md:basis-2/4 lg:basis-1/6"
            >
                <Image
                src={`/images/brands/${url}`}
                alt="Brand"
                width={120}
                height={120}
                className="object-contain aspect-[3/3]"/>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Reveal>
  );
}
