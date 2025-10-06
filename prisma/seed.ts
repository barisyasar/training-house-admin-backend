import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function cleanDatabase() {
  console.log('🧹 Cleaning database and files...');

  // Clean public gifs directory
  const gifsDir = path.join(__dirname, '..', 'public', 'exercises', 'gifs');
  if (fs.existsSync(gifsDir)) {
    fs.rmSync(gifsDir, { recursive: true, force: true });
    console.log('🗑️  Cleaned gifs directory');
  }

  // Delete in reverse order of dependencies
  await prisma.exerciseGif.deleteMany();
  await prisma.exerciseStep.deleteMany();
  await prisma.exerciseTranslation.deleteMany();
  await prisma.exerciseTargetBodyPart.deleteMany();
  await prisma.exerciseEquipment.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.targetBodyPart.deleteMany();

  console.log('✨ Database cleaned!');
}

function ensureGifDirectory(exerciseId: string) {
  const gifDir = path.join(
    __dirname,
    '..',
    'public',
    'exercises',
    'gifs',
    exerciseId,
  );
  if (!fs.existsSync(gifDir)) {
    fs.mkdirSync(gifDir, { recursive: true });
  }
  return gifDir;
}

function copyGifFiles(
  exerciseId: string,
  gifFiles: Record<string, string>,
  oldGif: Record<string, string>,
) {
  const sourceDir = path.join(__dirname, 'exercises-images');
  const targetDir = ensureGifDirectory(exerciseId);

  if (!fs.existsSync(sourceDir)) {
    console.warn(`⚠️ Warning: GIF source directory not found: ${sourceDir}`);
    return;
  }

  Object.entries(gifFiles).forEach(([size, newFilename]) => {
    // Get the original filename from the exercise data
    const oldFilename = oldGif[size];
    if (oldFilename) {
      const sourcePath = path.join(sourceDir, oldFilename);
      const targetPath = path.join(targetDir, newFilename);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
      } else {
        console.warn(`⚠️ Warning: GIF file not found: ${sourcePath}`);
      }
    }
  });
}

// Import all exercise files
const exercisesDir = path.join(__dirname, 'exercises');
console.log('📂 Exercises directory:', exercisesDir);

const exerciseFiles = fs
  .readdirSync(exercisesDir)
  .filter((file) => file.endsWith('.ts'));

console.log('📝 Found exercise files:', exerciseFiles);

// Import exercise data
const exercises = exerciseFiles
  .slice(0, 1)
  .map((file) => {
    try {
      const filePath = path.join(exercisesDir, file);
      console.log(`📖 Importing ${file}...`);
      const module = require(filePath);
      return module.default;
    } catch (error) {
      console.error(`❌ Error importing ${file}:`, error);
      return null;
    }
  })
  .filter(Boolean); // Remove null entries

console.log(`✅ Successfully imported ${exercises.length} exercises`);

const exerciseEquipmentOptions = [
  { value: 'dumbbell', label: 'Dumbbell' },
  { value: 'chair', label: 'Chair' },
  { value: 'towel', label: 'Towel' },
  { value: 'bottle', label: 'Bottle' },
  { value: 'two-bottles', label: 'Two Bottles' },
];

const exerciseTargetBodyPartOptions = [
  { value: 'biceps', label: 'Biceps' },
  { value: 'triceps', label: 'Triceps' },
  { value: 'chest', label: 'Chest' },
  { value: 'back', label: 'Back' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'legs', label: 'Legs' },
  { value: 'glutes', label: 'Glutes' },
  { value: 'core', label: 'Core' },
  { value: 'neck', label: 'Neck' },
];

async function main() {
  console.log('🌱 Starting seed...');

  await cleanDatabase();

  // Create equipment options
  console.log('Creating equipment options...');
  for (const equipment of exerciseEquipmentOptions) {
    await prisma.equipment.upsert({
      where: { value: equipment.value },
      update: {},
      create: {
        label: equipment.label,
        value: equipment.value,
      },
    });
  }

  // Create target body part options
  console.log('Creating target body part options...');
  for (const bodyPart of exerciseTargetBodyPartOptions) {
    await prisma.targetBodyPart.upsert({
      where: { value: bodyPart.value },
      update: {},
      create: {
        label: bodyPart.label,
        value: bodyPart.value,
      },
    });
  }

  // Seed exercises
  console.log('Creating exercises...');
  for (const exercise of exercises.slice(0, 1)) {
    const exerciseId = randomUUID();
    console.log(`🏋️ Processing exercise with ID: ${exerciseId}`);
    const {
      type,
      measurementType,
      reps,
      duration,
      translations,
      targetBodyParts,
      gif: oldGif,
      isEachSide = false,
    } = exercise;

    const gif = Object.entries(oldGif).reduce<Record<string, string>>(
      (acc, [size, filename]) => {
        acc[size] = `${size}x${size}.gif`;
        return acc;
      },
      {},
    );

    // Copy GIF files to public directory
    copyGifFiles(exerciseId, gif, oldGif);

    // Create the exercise
    await prisma.exercise.upsert({
      where: { exerciseId },
      update: {},
      create: {
        exerciseId,
        type,
        measurementType,
        reps,
        duration,
        isEachSide,
        translations: {
          create: translations.map((trans) => ({
            locale: trans.locale,
            name: trans.name,
            desc: trans.desc,
            steps: {
              create: trans.steps.map((step, index) => ({
                value: step,
                order: index,
              })),
            },
          })),
        },
        targetBodyParts: {
          create: targetBodyParts.map((part) => ({
            targetBodyPart: {
              connect: { value: part.value },
            },
          })),
        },
        gifs: {
          create: Object.entries(gif).map(([size, filename]) => ({
            size: parseInt(size),
            url: `/public/exercises/gifs/${exerciseId}/${filename}`,
          })),
        },
      },
    });
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
