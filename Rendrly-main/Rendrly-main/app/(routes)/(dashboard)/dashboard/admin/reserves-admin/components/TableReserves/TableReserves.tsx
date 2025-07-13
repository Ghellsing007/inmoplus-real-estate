"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablesReservesProps } from "./TableReserves.types";
import { formatPrice } from "@/lib/formatPrice";
import { formatDate } from "@/lib/formatDate";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TableReserves(props: TablesReservesProps) {
  const { orders, currentPage, totalPages, totalCount, itemsPerPage } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      params.set("page", "1"); // Reset to first page on search
      router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams]);

  const totalAmount = orders.reduce((acc, booking) => {
    return acc + booking.totalAmount;
  }, 0);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Buscar por coche o cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableCaption>A list of the recent bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order Date</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Car</TableHead>
            <TableHead>Date Start</TableHead>
            <TableHead>Date End</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {formatDate(new Date(order.createAt))}
              </TableCell>
              <TableCell className="font-medium max-w-[100px] truncate">
                {order.userId}
              </TableCell>
              <TableCell>{order.carName}</TableCell>
              <TableCell>{formatDate(new Date(order.orderDate))}</TableCell>
              <TableCell>{formatDate(new Date(order.orderEndDate))}</TableCell>

              <TableCell className="text-right">
                {formatPrice(Number(order.totalAmount))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              {formatPrice(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
