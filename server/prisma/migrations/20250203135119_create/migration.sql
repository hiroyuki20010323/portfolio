/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Calendar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Calendar_date_key` ON `Calendar`(`date`);
