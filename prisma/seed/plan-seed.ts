import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function seedPlans() {
  const plans = [
    {
      planId: randomUUID(),
      translations: {
        create: [
          { locale: 'tr-TR', label: 'ücretsiz' },
          { locale: 'en-US', label: 'free' },
        ],
      },
    },
    {
      planId: randomUUID(),
      translations: {
        create: [
          { locale: 'tr-TR', label: 'altın' },
          { locale: 'en-US', label: 'gold' },
        ],
      },
    },
    {
      planId: randomUUID(),
      translations: {
        create: [
          { locale: 'tr-TR', label: 'platin' },
          { locale: 'en-US', label: 'platinum' },
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
