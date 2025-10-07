import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPlans() {
  const plans = [
    {
      planId: 'free',
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Ücretsiz' },
          { locale: 'en-US', label: 'Free' },
        ],
      },
    },
    {
      planId: 'gold',
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Altın' },
          { locale: 'en-US', label: 'Gold' },
        ],
      },
    },
    {
      planId: 'platinum',
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Platin' },
          { locale: 'en-US', label: 'Platinum' },
        ],
      },
    },
  ];

  for (const plan of plans) {
    await prisma.plan.create({
      data: plan,
    });
  }
}

export default seedPlans;
