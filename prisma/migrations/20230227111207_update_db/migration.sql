/*
  Warnings:

  - You are about to drop the column `tableId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_tableId_fkey";

-- DropIndex
DROP INDEX "Invoice_orderId_key";

-- DropIndex
DROP INDEX "Invoice_tableId_key";

-- DropIndex
DROP INDEX "Order_userId_key";

-- DropIndex
DROP INDEX "OrderItem_foodId_key";

-- DropIndex
DROP INDEX "OrderItem_orderId_key";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "tableId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePhoto",
DROP COLUMN "refreshToken",
DROP COLUMN "token";

-- DropTable
DROP TABLE "Table";
