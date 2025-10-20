import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function seedPublicWorkouts() {
  // Create directories and copy images
  const publicWorkoutsDir = path.join(
    process.cwd(),
    'public/public-workouts/banners',
  );
  await fs.mkdir(publicWorkoutsDir, { recursive: true });

  // Get list of available workout images
  const workoutImagesDir = path.join(process.cwd(), 'prisma/workouts-images');
  const files = await fs.readdir(workoutImagesDir);
  const workoutImages = files.filter((f) => f.match(/workout\d+\.jpeg/));

  if (workoutImages.length === 0) {
    throw new Error('No workout images found in prisma/workouts-images');
  }

  const workoutUUIDs = Array.from({ length: 10 }, () => randomUUID());

  for (let i = 0; i < 10; i++) {
    const workoutId = workoutUUIDs[i];
    const targetDir = path.join(publicWorkoutsDir, workoutId);
    await fs.mkdir(targetDir, { recursive: true });

    // Use modulo to cycle through available images if we don't have enough
    const sourceImageIndex = i % workoutImages.length;
    const sourceImage = path.join(
      workoutImagesDir,
      workoutImages[sourceImageIndex],
    );
    const targetImage = path.join(targetDir, `1_${Date.now()}.jpeg`);
    await fs.copyFile(sourceImage, targetImage);
  }

  // Get random exercises with full details
  const exercises = await prisma.exercise.findMany({
    take: 12,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      translations: true,
      targetBodyParts: {
        include: {
          targetBodyPart: true,
        },
      },
      gifs: true,
      equipments: {
        include: {
          equipment: true,
        },
      },
    },
  });

  const plans = await prisma.plan.findMany({
    take: 1,
    select: { planId: true },
  });

  if (!plans.length) {
    console.log('⚠️ No plans found, skipping public workouts seeding');
    return;
  }

  const categories = await prisma.category.findMany({
    take: 2,
    select: { categoryId: true },
  });

  const goals = await prisma.goal.findMany({
    take: 2,
    select: { goalId: true },
  });

  // Calculate workout stats based on exercises
  const workouts = workoutUUIDs.map((workoutId, i) => {
    // Calculate total duration based on exercise durations and reps
    const totalDuration = exercises.reduce((acc, ex) => {
      if (ex.type === 'rest') {
        return acc + (ex.duration || 0);
      }
      if (ex.measurementType === 'time') {
        return acc + (ex.duration || 0);
      }
      // For rep-based exercises, estimate 3 seconds per rep
      return acc + (ex.reps || 10) * 3;
    }, 0);

    // Calculate estimated calories (rough estimation)
    const caloriesPerMinute = Math.floor(Math.random() * (8 - 5 + 1)) + 5; // 5-8 calories per minute
    const estimatedCalories = Math.round(
      (totalDuration / 60) * caloriesPerMinute * 10,
    );

    const level = ['Beginner', 'Intermediate', 'Advanced'][
      Math.floor(Math.random() * 3)
    ];

    return {
      duration: totalDuration,
      calories: estimatedCalories,
      level,
      isFeatured: Math.random() < 0.3, // 30% chance to be featured
      planId: plans[0].planId,
      categories: {
        connect: categories.map((cat) => ({ categoryId: cat.categoryId })),
      },
      goals: {
        connect: goals.map((goal) => ({ goalId: goal.goalId })),
      },
      translations: {
        create: [
          {
            locale: 'en-US',
            name: `Workout ${i + 1}`,
            desc: `Workout ${i + 1} description`,
          },
          {
            locale: 'tr-Tr',
            name: `Antrenman ${i + 1}`,
            desc: `Antrenman ${i + 1} açıklaması`,
          },
        ],
      },

      exercises: {
        create: exercises.map((ex, index) => ({
          exercise: {
            connect: { exerciseId: ex.exerciseId },
          },
          orderNumber: index + 1, // Assign an order number starting from 1
          measurementType: ex.measurementType,
          duration: ex.measurementType === 'time' ? (ex.duration ?? 0) : 0, // Use 0 instead of null
          reps: ex.measurementType === 'reps' ? (ex.reps ?? 0) : 0, // Use 0 instead of null
          type: ex.type,
        })),
      },
      banners: {
        create: {
          order: 1, // First banner
          url: `/public/public-workouts/banners/${workoutId}/1_${Date.now()}.jpeg`,
        },
      },
    };
  });

  for (const workout of workouts) {
    await prisma.publicWorkout.create({
      data: workout,
    });
  }
}

export default seedPublicWorkouts;
