/*
  Warnings:

  - You are about to drop the `equipments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `target_body_parts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."exercise_equipments" DROP CONSTRAINT "exercise_equipments_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."exercise_target_body_parts" DROP CONSTRAINT "exercise_target_body_parts_targetBodyPartId_fkey";

-- DropIndex
DROP INDEX "public"."exercise_equipments_exerciseId_equipmentId_key";

-- DropIndex
DROP INDEX "public"."exercise_target_body_parts_exerciseId_targetBodyPartId_key";

-- DropTable
DROP TABLE "public"."equipments";

-- DropTable
DROP TABLE "public"."target_body_parts";
