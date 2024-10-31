-- CreateTable
CREATE TABLE "LikeHistory" (
    "id" SERIAL NOT NULL,
    "videoid" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,

    CONSTRAINT "LikeHistory_pkey" PRIMARY KEY ("id")
);
