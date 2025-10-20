/*
  Warnings:

  - You are about to drop the column `size` on the `public_workout_banners` table. All the data in the column will be lost.
  - Added the required column `order` to the `public_workout_banners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public_workout_banners" DROP COLUMN "size",
ADD COLUMN     "order" INTEGER NOT NULL;
