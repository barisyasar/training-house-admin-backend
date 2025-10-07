import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function seedCategories() {
  const categories = [
    {
      categoryId: randomUUID(),
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Kardiyo' },
          { locale: 'en-US', label: 'Cardio' },
        ],
      },
    },
    {
      categoryId: randomUUID(),
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Güç' },
          { locale: 'en-US', label: 'Strength' },
        ],
      },
    },
    {
      categoryId: randomUUID(),
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Esneme' },
          { locale: 'en-US', label: 'Stretching' },
        ],
      },
    },
    {
      categoryId: randomUUID(),
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Yoga' },
          { locale: 'en-US', label: 'Yoga' },
        ],
      },
    },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
}

export default seedCategories;
