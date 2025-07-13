-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cv" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "people" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "priceDay" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isPublish" BOOLEAN,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "carName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderDate" TEXT NOT NULL,
    "orderEndDate" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_carId_idx" ON "Order"("carId");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
