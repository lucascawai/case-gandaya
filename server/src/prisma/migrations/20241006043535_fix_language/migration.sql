/*
  Warnings:

  - You are about to drop the column `pedidoId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `precoUnitario` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Product` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_pedidoId_fkey`;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `pedidoId`,
    DROP COLUMN `precoUnitario`,
    DROP COLUMN `quantidade`,
    ADD COLUMN `orderId` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `unitPrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `nome`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
