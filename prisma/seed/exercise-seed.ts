import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

function ensureGifDirectory(exerciseId: string) {
  const gifDir = path.join(
    process.cwd(),
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
  const sourceDir = path.join(process.cwd(), 'prisma', 'exercises-images');
  const targetDir = ensureGifDirectory(exerciseId);

  if (!fs.existsSync(sourceDir)) {
    console.warn(`⚠️ Warning: GIF source directory not found: ${sourceDir}`);
    return;
  }

  Object.entries(gifFiles).forEach(([size, newFilename]) => {
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

async function seedExercises(exercises) {
  console.log('Creating exercises...');

  console.log('Processing rest');
  await prisma.exercise.create({
    data: {
      exerciseId: randomUUID(),
      type: 'rest',
      measurementType: 'time',
      duration: 20,
      translations: {
        create: [
          {
            locale: 'en-US',
            name: 'Rest',
            desc: 'Rest for 20 seconds',
          },
          {
            locale: 'tr-TR',
            name: 'Dinlenme',
            desc: '20 saniye dinlenme',
          },
        ],
      },
    },
  });

  for (const exercise of exercises) {
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

    copyGifFiles(exerciseId, gif, oldGif);

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
          create: await Promise.all(
            targetBodyParts.map(async (part) => {
              // Find target body part by its English translation
              const targetBodyPart = await prisma.targetBodyPart.findFirst({
                where: {
                  translations: {
                    some: {
                      locale: 'en-US',
                      label: {
                        mode: 'insensitive',
                        equals: part.value,
                      },
                    },
                  },
                },
              });

              if (!targetBodyPart) {
                throw new Error(`Target body part not found: ${part.value}`);
              }

              return {
                targetBodyPart: {
                  connect: {
                    targetBodyPartId: targetBodyPart.targetBodyPartId,
                  },
                },
              };
            }),
          ),
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

  console.log('✅ Exercises seeding completed!');
}

export default seedExercises;
