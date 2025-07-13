import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableReserves } from "./components/TableReserves";

export default async function reservesPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/*");
  }

  const orders = await db.order.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="text-2xl">Cars reserve</h1>
      {orders.length ===0 ? (
        <div className="flex flex-col justify-center gap-4 p-6">
          <h2 className="text-xl">No tienes ningun pedido</h2>
          <p>Has tus pedidos a travéz de la página de vehiculos</p>
          <Link href="/cars">
            <Button>Lista de Vehiculos</Button>
          </Link>
        </div>
      ) : (
        <TableReserves orders={orders}/>
      )}
    </div>
  );
}
