-- CreateEnum
CREATE TYPE "LanguageCode" AS ENUM ('tr-TR', 'en-US');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('exercise', 'rest');

-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('time', 'reps');

-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "type" "ExerciseType" NOT NULL,
    "measurementType" "MeasurementType" NOT NULL,
    "duration" INTEGER,
    "reps" INTEGER,
    "isEachSide" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_translations" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "locale" "LanguageCode" NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_steps" (
    "id" TEXT NOT NULL,
    "exerciseTranslationId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_equipments" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "target_body_parts" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "target_body_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_target_body_parts" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "targetBodyPartId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_target_body_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_gifs" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_gifs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercises_exerciseId_key" ON "exercises"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_translations_exerciseId_locale_key" ON "exercise_translations"("exerciseId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_equipments_exerciseId_equipmentId_key" ON "exercise_equipments"("exerciseId", "equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_target_body_parts_exerciseId_targetBodyPartId_key" ON "exercise_target_body_parts"("exerciseId", "targetBodyPartId");

-- AddForeignKey
ALTER TABLE "exercise_translations" ADD CONSTRAINT "exercise_translations_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_steps" ADD CONSTRAINT "exercise_steps_exerciseTranslationId_fkey" FOREIGN KEY ("exerciseTranslationId") REFERENCES "exercise_translations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_equipments" ADD CONSTRAINT "exercise_equipments_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_equipments" ADD CONSTRAINT "exercise_equipments_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_target_body_parts" ADD CONSTRAINT "exercise_target_body_parts_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_target_body_parts" ADD CONSTRAINT "exercise_target_body_parts_targetBodyPartId_fkey" FOREIGN KEY ("targetBodyPartId") REFERENCES "target_body_parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_gifs" ADD CONSTRAINT "exercise_gifs_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
