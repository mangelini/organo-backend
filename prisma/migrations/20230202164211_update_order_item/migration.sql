/*
  Warnings:

  - A unique constraint covering the columns `[foodId]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `foodId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "foodId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_foodId_key" ON "OrderItem"("foodId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
