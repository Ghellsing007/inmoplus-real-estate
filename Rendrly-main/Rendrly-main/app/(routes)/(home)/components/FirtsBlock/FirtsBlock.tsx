"use client";

import { Reveal } from "@/components/shared/Reveal";
import Image from "next/image"
// import { useTranslation } from 'next-i18next'; // Eliminado

export function FirtsBlock() {
  // const { t } = useTranslation(); // Eliminado

  return (
    <div>
    <div className="grid lg:grid-cols-2 lg:px-0 lg:py-6  items-center">
      <Reveal className="px-6 lg:pl-40" position="bottom">
      <h1 className="text-7xl md:7xl lg:text-7xl font-bold">
        Premium
        <span className="block">Car Rental </span>
        in Dominican Republic
      </h1>
      <p className="text-lg mt-4 lg:mt-5 lg:text-xl max-w-sm">
        Dont deny yourself pleasure of driving the best premium cars from around
        the world here and now
      </p>
      </Reveal>  

      <div>

      <Reveal className="flex justify-end" position="right">
        <Image
        src="/images/aston.png"
        alt="Rendrly"
        width={800}
        height={800}
        priority
        />
      </Reveal>
      </div>    
      
      
    </div>
    
    </div>
   
  );
}
