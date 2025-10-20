/*
  Warnings:

  - You are about to drop the column `size` on the `exercise_gifs` table. All the data in the column will be lost.
  - Added the required column `order` to the `exercise_gifs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercise_gifs" DROP COLUMN "size",
ADD COLUMN     "order" INTEGER NOT NULL;
