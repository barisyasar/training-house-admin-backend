import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
  const categories = [
    {
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Kardiyo' },
          { locale: 'en-US', label: 'Cardio' },
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
    {
      translations: {
        create: [
          { locale: 'tr-TR', label: 'Esneme' },
          { locale: 'en-US', label: 'Stretching' },
        ],
      },
    },
    {
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
