import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exerciseEquipmentOptions = [
  { value: 'dumbbell', label: 'Dumbbell' },
  { value: 'chair', label: 'Chair' },
  { value: 'towel', label: 'Towel' },
  { value: 'bottle', label: 'Bottle' },
  { value: 'two-bottles', label: 'Two Bottles' },
];

async function seedEquipment() {
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
  console.log('✅ Equipment seeding completed!');
}

export default seedEquipment;
