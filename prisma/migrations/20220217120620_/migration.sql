/*
  Warnings:

  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_username_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `username`,
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `user`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `phone` ON `user`(`phone`);
