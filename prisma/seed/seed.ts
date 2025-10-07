import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import cleanDatabase from './clear-db';
import seedEquipment from './equipment-seed';
import seedTargetBodyParts from './target-body-part-seed';
import seedExercises from './exercise-seed';

const prisma = new PrismaClient();

// Import all exercise files
const exercisesDir = path.join(__dirname, 'exercises');
console.log('📂 Exercises directory:', exercisesDir);

const exerciseFiles = fs
  .readdirSync(exercisesDir)
  .filter((file) => file.endsWith('.ts'));

console.log('📝 Found exercise files:', exerciseFiles);

// Import exercise data
const exercises = exerciseFiles
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

async function main() {
  console.log('🌱 Starting seed...');

  await cleanDatabase();

  await seedEquipment();
  await seedTargetBodyParts();
  await seedExercises(exercises);

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
