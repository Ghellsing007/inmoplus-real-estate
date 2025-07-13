/*
  Warnings:

  - You are about to drop the column `brand` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "brand",
DROP COLUMN "description",
DROP COLUMN "model",
DROP COLUMN "year",
ALTER COLUMN "isPublish" DROP NOT NULL,
ALTER COLUMN "isPublish" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "carName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "orderEndDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_carId_idx" ON "Order"("carId");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
