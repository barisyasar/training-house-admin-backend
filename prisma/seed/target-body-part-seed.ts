import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exerciseTargetBodyPartOptions = [
  {
    translations: [
      { locale: 'en-US', label: 'biceps' },
      { locale: 'tr-TR', label: 'biseps' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'triceps' },
      { locale: 'tr-TR', label: 'triseps' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'chest' },
      { locale: 'tr-TR', label: 'göğüs' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'back' },
      { locale: 'tr-TR', label: 'sırt' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'shoulders' },
      { locale: 'tr-TR', label: 'omuzlar' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'legs' },
      { locale: 'tr-TR', label: 'bacaklar' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'glutes' },
      { locale: 'tr-TR', label: 'kalça' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'core' },
      { locale: 'tr-TR', label: 'karın' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'neck' },
      { locale: 'tr-TR', label: 'boyun' },
    ],
  },
];

async function seedTargetBodyParts() {
  console.log('Creating target body part options...');
  for (const bodyPart of exerciseTargetBodyPartOptions) {
    const createdBodyPart = await prisma.targetBodyPart.create({
      data: {},
    });

    // Create translations
    for (const translation of bodyPart.translations) {
      await prisma.targetBodyPartTranslation.create({
        data: {
          targetBodyPartId: createdBodyPart.targetBodyPartId,
          locale: translation.locale,
          label: translation.label,
        },
      });
    }
  }
  console.log('✅ Target body parts seeding completed!');
}

export default seedTargetBodyParts;
