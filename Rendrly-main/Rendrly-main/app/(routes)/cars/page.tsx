import { Navbar } from "@/components/shared/Navbar";
import { db } from "@/lib/db";
import { HeaderCars } from "./components/HeaderCars";
import { FilterAndListCars } from "./components/FilterAndListCars";

export default async function carsPage() {
  const cars = await db.car.findMany({
    where:{
      isPublish: true,
    },
    orderBy:{
      createAt:"desc"
    }
  })


  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto max-w-7xl">
        <HeaderCars/>
      </div>
      <div>
        <FilterAndListCars cars={cars}/> 
      </div>
    </div>
  );
}
