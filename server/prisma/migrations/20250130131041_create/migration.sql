-- CreateTable
CREATE TABLE `Calendar` (
    `id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskTitle` VARCHAR(191) NOT NULL,
    `taskDetail` VARCHAR(191) NULL,
    `taskImageUrl` VARCHAR(191) NULL,
    `period` DATETIME(3) NOT NULL,
    `createdUserId` VARCHAR(191) NOT NULL,
    `createdGroupId` INTEGER NOT NULL,
    `assigneeUserId` VARCHAR(191) NULL,
    `assigneeGroupId` INTEGER NULL,
    `calenderId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `calendar_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_createdUserId_createdGroupId_fkey` FOREIGN KEY (`createdUserId`, `createdGroupId`) REFERENCES `Participation`(`userId`, `groupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_assigneeUserId_assigneeGroupId_fkey` FOREIGN KEY (`assigneeUserId`, `assigneeGroupId`) REFERENCES `Participation`(`userId`, `groupId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_calendar_id_fkey` FOREIGN KEY (`calendar_id`) REFERENCES `Calendar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
