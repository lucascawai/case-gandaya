/*
  Warnings:

  - You are about to drop the column `unitPrice` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_productId_fkey`;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `unitPrice`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `quantity`,
    ADD COLUMN `quantityInStock` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `Event`;
