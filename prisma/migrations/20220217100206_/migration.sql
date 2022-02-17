-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(191) NOT NULL;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `phone` TO `user_phone_key`;
