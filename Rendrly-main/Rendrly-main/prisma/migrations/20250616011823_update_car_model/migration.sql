/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `isPublish` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "year" INTEGER,
ALTER COLUMN "isPublish" SET NOT NULL,
ALTER COLUMN "isPublish" SET DEFAULT false;

-- DropTable
DROP TABLE "Order";
