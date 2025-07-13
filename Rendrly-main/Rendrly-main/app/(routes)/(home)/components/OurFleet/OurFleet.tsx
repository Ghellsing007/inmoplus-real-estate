"use client";

import { Button } from "@/components/ui/button";

import { MoveRight } from "lucide-react";

import {
  categoryOueFleet,
  dataFirstBlockOurFleet,
  dataSecondBlockOurFleet,
} from "./OurFleet.data";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

export function OurFleet() {
  // const router = useRouter();
  // const [selectedCategory, setSelectedCategory] = useState<string>("");

  // const handleCategoryClick = (categoryName: string) => {
  //   setSelectedCategory(categoryName);
  //   router.push(`/cars?type=${categoryName.toLowerCase()}`);
  // };

  return (
    <div className="max-w-6xl mx-auto text-center py-12 lg:py-12 p-6">
      <h3 className="text-6xl lg:text-6xl font-bold">Our Vehicle Feet</h3>
      <p className="text-lg mt-2 lg:mt-10 lg:text-xl text-center w-full mx-auto max-w-2xl mb-5 lg:mb-10">
        Dont deny yourself pleasure of driving the best premium cars from around
        the world here and now the world
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 items-center justify-center mb-5 max-w-2xl mx-auto">
        {categoryOueFleet.map(({ name }) => (
          <div
            key={name}
            // onClick={() => handleCategoryClick(name)}
            className={cn(
              "rounded-xl py-2 px-3",
              // selectedCategory.toLowerCase() === name.toLowerCase() ? "bg-black text-white" : "bg-slate-100"
              "bg-slate-100" // Default style when not interactive
            )}
          >
            {name}
          </div>
        ))}
      </div>

      <div className="mb-10">
        <div className="grid grid-cols-3 gap-x-6 mb-6">
          {dataFirstBlockOurFleet.map(({ url }) => (
            <div key={url}>
              <div className="relative w-full aspect-[3/2]">
                <Image
                  src={`/images/cars/${url}`}
                  alt="Car"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-x-6 max-w-5xl mx-auto">
          {dataSecondBlockOurFleet.map(({ url }) => (
            <div key={url}>
              <div className="relative w-full aspect-[3/2]">
                <Image
                  src={`/images/cars/${url}`}
                  alt="Car"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <Link href={"/cars"}>
          <Button className="rounded-xl p-6 text-lg mt-5" variant="outline">
            Show all models <MoveRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
