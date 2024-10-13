/*
  Warnings:

  - A unique constraint covering the columns `[videoid]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Video_videoid_key" ON "Video"("videoid");
