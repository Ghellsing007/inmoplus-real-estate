/*
  Warnings:

  - Changed the type of `orderDate` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `orderEndDate` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `totalAmount` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderDate",
ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "orderEndDate",
ADD COLUMN     "orderEndDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "totalAmount",
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;
