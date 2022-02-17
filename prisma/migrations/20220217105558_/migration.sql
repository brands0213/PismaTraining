/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `email` ON `user`;

-- DropIndex
DROP INDEX `user_phone_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `phone`,
    ADD COLUMN `username` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);
