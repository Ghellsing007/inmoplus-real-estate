"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/shared/Reveal";

export function DriveToday() {
  return (
    <div className="P-6 lg:my-32 max-w-7xl mx-auto">
      <div className="bg-[url('/images/background-2.jpg')] bg-center bg-no-repeat bg-cover rounded-xl p-6 lg:p-32 relative">
        <div className="lg:flex gap-x-6">
          <div>
            <h3 className="text-4xl text-white ">
              Driver your dream car Today
            </h3>
            <p className="text-white text-xl my-5">
              Register and explore the world of premium cars
            </p>
            <Link href={"/sign-in"}>
              <Button variant="outline" size="lg">
                Register here
              </Button>
            </Link>
          </div>

          <Reveal
            className="lg:absolute absolute right-0 lg:-right-0 top-5"
            position="right"
          >
            <Image
              src={"/images/aston-m.png"}
              alt="Car"
              width={500}
              height={250}
              className=""
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
