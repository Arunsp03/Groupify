/*
  Warnings:

  - Added the required column `videoid` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "videoid" TEXT NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "dislikes" SET DEFAULT 0,
ALTER COLUMN "hasplayed" SET DEFAULT 0,
ALTER COLUMN "username" SET DEFAULT '';
