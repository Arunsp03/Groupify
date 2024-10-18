/*
  Warnings:

  - Added the required column `isplaying` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "streamername" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "isplaying" INTEGER NOT NULL;
