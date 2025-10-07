import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

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

export default cleanDatabase;
