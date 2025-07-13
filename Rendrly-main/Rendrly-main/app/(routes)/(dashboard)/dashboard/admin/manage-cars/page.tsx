import { db } from "@/lib/db";
import { ButtonAddCars } from "./components/ButtonAddCars";
import { ListCars } from "./components/ListCars/ListCars";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdministrator } from "@/lib/isAdministrator";

export default async function CarsManagerPage() {
  
  const {userId} = await auth()

  if(!userId || !isAdministrator(userId) ){
    return redirect("/")
  }

  const car = await db.car.findMany({
    where:{
      userId,
    },
    orderBy:{
      createAt:"desc",
    },
  })

  console.log(car);

  return (
   <div>
    <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Manage your cars</h2>
        <ButtonAddCars/>
    </div>
    <ListCars cars={car}/>
   </div>
  )
}
