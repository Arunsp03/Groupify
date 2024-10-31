/*
  Warnings:

  - Added the required column `streamername` to the `LikeHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LikeHistory" ADD COLUMN     "streamername" VARCHAR(255) NOT NULL;
