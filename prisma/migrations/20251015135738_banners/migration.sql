-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('exercise', 'rest');

-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('time', 'reps');

-- CreateTable
CREATE TABLE "exercises" (
    "exerciseId" TEXT NOT NULL,
    "type" "ExerciseType" NOT NULL,
    "measurementType" "MeasurementType" NOT NULL,
    "duration" INTEGER,
    "reps" INTEGER,
    "isEachSide" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("exerciseId")
);

-- CreateTable
CREATE TABLE "exercise_translations" (
    "exerciseTranslationId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_translations_pkey" PRIMARY KEY ("exerciseTranslationId")
);

-- CreateTable
CREATE TABLE "exercise_steps" (
    "exerciseStepId" TEXT NOT NULL,
    "exerciseTranslationId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_steps_pkey" PRIMARY KEY ("exerciseStepId")
);

-- CreateTable
CREATE TABLE "equipments" (
    "equipmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("equipmentId")
);

-- CreateTable
CREATE TABLE "equipment_translations" (
    "equipmentTranslationId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_translations_pkey" PRIMARY KEY ("equipmentTranslationId")
);

-- CreateTable
CREATE TABLE "exercise_equipments" (
    "exerciseEquipmentId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_equipments_pkey" PRIMARY KEY ("exerciseEquipmentId")
);

-- CreateTable
CREATE TABLE "target_body_parts" (
    "targetBodyPartId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "target_body_parts_pkey" PRIMARY KEY ("targetBodyPartId")
);

-- CreateTable
CREATE TABLE "target_body_part_translations" (
    "targetBodyPartTranslationId" TEXT NOT NULL,
    "targetBodyPartId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "target_body_part_translations_pkey" PRIMARY KEY ("targetBodyPartTranslationId")
);

-- CreateTable
CREATE TABLE "exercise_target_body_parts" (
    "exerciseTargetBodyPartId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "targetBodyPartId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_target_body_parts_pkey" PRIMARY KEY ("exerciseTargetBodyPartId")
);

-- CreateTable
CREATE TABLE "exercise_gifs" (
    "exerciseGifId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_gifs_pkey" PRIMARY KEY ("exerciseGifId")
);

-- CreateTable
CREATE TABLE "categories" (
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "category_translations" (
    "categoryTranslationId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_translations_pkey" PRIMARY KEY ("categoryTranslationId")
);

-- CreateTable
CREATE TABLE "goals" (
    "goalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("goalId")
);

-- CreateTable
CREATE TABLE "goal_translations" (
    "goalTranslationId" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goal_translations_pkey" PRIMARY KEY ("goalTranslationId")
);

-- CreateTable
CREATE TABLE "plans" (
    "planId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("planId")
);

-- CreateTable
CREATE TABLE "plan_translations" (
    "planTranslationId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_translations_pkey" PRIMARY KEY ("planTranslationId")
);

-- CreateTable
CREATE TABLE "public_workouts" (
    "publicWorkoutId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "public_workouts_pkey" PRIMARY KEY ("publicWorkoutId")
);

-- CreateTable
CREATE TABLE "public_workout_translations" (
    "publicWorkoutTranslationId" TEXT NOT NULL,
    "publicWorkoutId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "public_workout_translations_pkey" PRIMARY KEY ("publicWorkoutTranslationId")
);

-- CreateTable
CREATE TABLE "public_workout_banners" (
    "publicWorkoutBannerId" TEXT NOT NULL,
    "publicWorkoutId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "public_workout_banners_pkey" PRIMARY KEY ("publicWorkoutBannerId")
);

-- CreateTable
CREATE TABLE "public_workout_exercises" (
    "publicWorkoutExerciseId" TEXT NOT NULL,
    "publicWorkoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "measurementType" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "public_workout_exercises_pkey" PRIMARY KEY ("publicWorkoutExerciseId")
);

-- CreateTable
CREATE TABLE "_CategoryToPublicWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToPublicWorkout_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GoalToPublicWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GoalToPublicWorkout_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercise_translations_exerciseId_locale_key" ON "exercise_translations"("exerciseId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "equipment_translations_equipmentId_locale_key" ON "equipment_translations"("equipmentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "target_body_part_translations_targetBodyPartId_locale_key" ON "target_body_part_translations"("targetBodyPartId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "category_translations_categoryId_locale_key" ON "category_translations"("categoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "goal_translations_goalId_locale_key" ON "goal_translations"("goalId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "plan_translations_planId_locale_key" ON "plan_translations"("planId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "public_workout_translations_publicWorkoutId_locale_key" ON "public_workout_translations"("publicWorkoutId", "locale");

-- CreateIndex
CREATE INDEX "_CategoryToPublicWorkout_B_index" ON "_CategoryToPublicWorkout"("B");

-- CreateIndex
CREATE INDEX "_GoalToPublicWorkout_B_index" ON "_GoalToPublicWorkout"("B");

-- AddForeignKey
ALTER TABLE "exercise_translations" ADD CONSTRAINT "exercise_translations_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exerciseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_steps" ADD CONSTRAINT "exercise_steps_exerciseTranslationId_fkey" FOREIGN KEY ("exerciseTranslationId") REFERENCES "exercise_translations"("exerciseTranslationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_translations" ADD CONSTRAINT "equipment_translations_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("equipmentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_equipments" ADD CONSTRAINT "exercise_equipments_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exerciseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_equipments" ADD CONSTRAINT "exercise_equipments_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("equipmentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "target_body_part_translations" ADD CONSTRAINT "target_body_part_translations_targetBodyPartId_fkey" FOREIGN KEY ("targetBodyPartId") REFERENCES "target_body_parts"("targetBodyPartId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_target_body_parts" ADD CONSTRAINT "exercise_target_body_parts_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exerciseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_target_body_parts" ADD CONSTRAINT "exercise_target_body_parts_targetBodyPartId_fkey" FOREIGN KEY ("targetBodyPartId") REFERENCES "target_body_parts"("targetBodyPartId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_gifs" ADD CONSTRAINT "exercise_gifs_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exerciseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_translations" ADD CONSTRAINT "category_translations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_translations" ADD CONSTRAINT "goal_translations_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("goalId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_translations" ADD CONSTRAINT "plan_translations_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("planId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_workouts" ADD CONSTRAINT "public_workouts_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_workout_translations" ADD CONSTRAINT "public_workout_translations_publicWorkoutId_fkey" FOREIGN KEY ("publicWorkoutId") REFERENCES "public_workouts"("publicWorkoutId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_workout_banners" ADD CONSTRAINT "public_workout_banners_publicWorkoutId_fkey" FOREIGN KEY ("publicWorkoutId") REFERENCES "public_workouts"("publicWorkoutId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_workout_exercises" ADD CONSTRAINT "public_workout_exercises_publicWorkoutId_fkey" FOREIGN KEY ("publicWorkoutId") REFERENCES "public_workouts"("publicWorkoutId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_workout_exercises" ADD CONSTRAINT "public_workout_exercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exerciseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPublicWorkout" ADD CONSTRAINT "_CategoryToPublicWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPublicWorkout" ADD CONSTRAINT "_CategoryToPublicWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "public_workouts"("publicWorkoutId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoalToPublicWorkout" ADD CONSTRAINT "_GoalToPublicWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "goals"("goalId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoalToPublicWorkout" ADD CONSTRAINT "_GoalToPublicWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "public_workouts"("publicWorkoutId") ON DELETE CASCADE ON UPDATE CASCADE;
