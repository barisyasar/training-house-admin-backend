import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedGoals() {
  const goals = [
    {
      goalId: 'weight-loss',
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Kilo Kaybı' },
          { locale: 'en-US', label: 'Weight Loss' },
        ],
      },
    },
    {
      goalId: 'muscle-gain',
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Kas Kazanımı' },
          { locale: 'en-US', label: 'Muscle Gain' },
        ],
      },
    },
    {
      goalId: 'strength',
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
