-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "likes" INTEGER NOT NULL,
    "dislikes" INTEGER NOT NULL,
    "hasplayed" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
