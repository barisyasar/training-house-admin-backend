import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function cleanDatabase() {
  console.log('🧹 Cleaning database and files...');

  // Clean public directories
  const gifsDir = path.join(process.cwd(), 'public', 'exercises', 'gifs');
  const publicWorkoutsDir = path.join(
    process.cwd(),
    'public',
    'public-workouts',
  );

  // Clean exercise gifs
  if (fs.existsSync(gifsDir)) {
    fs.rmSync(gifsDir, { recursive: true, force: true });
    console.log('🗑️  Cleaned exercise gifs directory');
  }

  // Clean public workouts directory (contains workout-specific banner folders)
  if (fs.existsSync(publicWorkoutsDir)) {
    fs.rmSync(publicWorkoutsDir, { recursive: true, force: true });
    console.log('🗑️  Cleaned public workouts directory');
  }

  // Recreate the public workouts directory
  fs.mkdirSync(publicWorkoutsDir, { recursive: true });

  // Delete in reverse order of dependencies
  // Clean public workouts and related data
  await prisma.publicWorkoutBanner.deleteMany();
  await prisma.publicWorkoutTranslation.deleteMany();
  await prisma.publicWorkoutExercise.deleteMany();
  await prisma.publicWorkout.deleteMany();

  // Clean exercises and related data
  await prisma.exerciseGif.deleteMany();
  await prisma.exerciseStep.deleteMany();
  await prisma.exerciseTranslation.deleteMany();
  await prisma.exerciseTargetBodyPart.deleteMany();
  await prisma.exerciseEquipment.deleteMany();
  await prisma.exercise.deleteMany();

  // Clean base data
  await prisma.equipmentTranslation.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.targetBodyPartTranslation.deleteMany();
  await prisma.targetBodyPart.deleteMany();
  await prisma.categoryTranslation.deleteMany();
  await prisma.category.deleteMany();
  await prisma.goalTranslation.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.planTranslation.deleteMany();
  await prisma.plan.deleteMany();

  console.log('✨ Database cleaned!');
}

export default cleanDatabase;
