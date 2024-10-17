/*
  Warnings:

  - You are about to drop the column `username` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "username",
ADD COLUMN     "streamername" TEXT NOT NULL DEFAULT '';
