import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedGoals() {
  const goals = [
    {
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Kilo Kaybı' },
          { locale: 'en-US', label: 'Weight Loss' },
        ],
      },
    },
    {
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Kas Kazanımı' },
          { locale: 'en-US', label: 'Muscle Gain' },
        ],
      },
    },
    {
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Güç' },
          { locale: 'en-US', label: 'Strength' },
        ],
      },
    },
  ];

  for (const goal of goals) {
    await prisma.goal.create({
      data: goal,
    });
  }
}

export default seedGoals;
