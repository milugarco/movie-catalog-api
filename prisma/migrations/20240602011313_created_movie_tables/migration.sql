-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ACTION', 'ADVENTURE', 'ANIMATION', 'BIOGRAPHIC', 'COMEDY', 'POLICE', 'DOCUMENTARY', 'DRAMA', 'FAMILY', 'FANTASY', 'FILM_NOIR', 'HISTORIC', 'HORROR', 'MUSICAL', 'MISTERY', 'ROMANCE', 'SCI_FI', 'SHORT_FILM', 'SPORT', 'THRILLER', 'WAR', 'WESTERN');

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "age_rating" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_fully" (
    "id" SERIAL NOT NULL,
    "movie_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "movie_fully_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_categories" (
    "id" SERIAL NOT NULL,
    "movie_id" TEXT NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "movie_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_slug_key" ON "movies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "movies_title_key" ON "movies"("title");

-- CreateIndex
CREATE UNIQUE INDEX "movie_fully_movie_id_key" ON "movie_fully"("movie_id");

-- AddForeignKey
ALTER TABLE "movie_fully" ADD CONSTRAINT "movie_fully_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_categories" ADD CONSTRAINT "movie_categories_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
