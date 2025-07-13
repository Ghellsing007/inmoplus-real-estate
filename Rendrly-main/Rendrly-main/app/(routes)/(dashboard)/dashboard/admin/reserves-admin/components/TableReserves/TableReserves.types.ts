import { Order } from "@prisma/client"

export type TablesReservesProps = {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
}