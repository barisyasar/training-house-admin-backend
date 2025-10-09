/*
  Warnings:

  - Added the required column `type` to the `public_workout_exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public_workout_exercises" ADD COLUMN     "type" TEXT NOT NULL;
