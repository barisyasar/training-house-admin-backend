import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exerciseEquipmentOptions = [
  {
    translations: [
      { locale: 'en-US', label: 'dumbbell' },
      { locale: 'tr-TR', label: 'dambıl' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'chair' },
      { locale: 'tr-TR', label: 'sandalye' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'towel' },
      { locale: 'tr-TR', label: 'havlu' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'bottle' },
      { locale: 'tr-TR', label: 'şişe' },
    ],
  },
  {
    translations: [
      { locale: 'en-US', label: 'two bottles' },
      { locale: 'tr-TR', label: 'iki şişe' },
    ],
  },
];

async function seedEquipment() {
  console.log('Creating equipment options...');
  for (const equipment of exerciseEquipmentOptions) {
    const createdEquipment = await prisma.equipment.create({
      data: {},
    });

    // Create translations
    for (const translation of equipment.translations) {
      await prisma.equipmentTranslation.create({
        data: {
          equipmentId: createdEquipment.equipmentId,
          locale: translation.locale,
          label: translation.label,
        },
      });
    }
  }
  console.log('✅ Equipment seeding completed!');
}

export default seedEquipment;
