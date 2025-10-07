import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function seedTargetBodyParts() {
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
  console.log('✅ Target body parts seeding completed!');
}

export default seedTargetBodyParts;
