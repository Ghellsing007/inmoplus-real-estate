import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TableReserves } from "./components/TableReserves";
import { isAdministrator } from "@/lib/isAdministrator";

interface ReservesAdminPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function reservesAdminPage({ searchParams }: ReservesAdminPageProps) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const itemsPerPage = 10; // Puedes ajustar esto
  const currentPage = typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;
  const skip = (currentPage - 1) * itemsPerPage;

  const searchQuery = typeof searchParams.search === "string" ? searchParams.search : "";

  const whereClause: any = {};
  if (searchQuery) {
    whereClause.OR = [
      { carName: { contains: searchQuery, mode: 'insensitive' } },
      { userId: { contains: searchQuery, mode: 'insensitive' } },
    ];
  }

  const orders = await db.order.findMany({
    where: whereClause,
    skip: skip,
    take: itemsPerPage,
    orderBy: {
      createAt: "desc",
    },
  });

  const totalOrders = await db.order.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  return (
    <div>
      <h1 className="text-3xl mb-4">Reserves page</h1>
      <TableReserves
        orders={orders}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalOrders}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
