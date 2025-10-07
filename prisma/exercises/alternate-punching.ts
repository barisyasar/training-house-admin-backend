export const ALTERNATE_PUNCHING = {
  exerciseId: 'alternate-punching',
  isSided: 'none',
  type: 'exercise',
  measurementType: 'reps' as const,
  reps: 10,
  translations: [
    {
      locale: 'en-US',
      name: 'Alternate Punching',
      desc: 'A dynamic cardio exercise that involves alternating punches to engage your core and improve coordination.',
      steps: [
        'Stand with feet shoulder-width apart',
        'Extend your left arm forward in a punching motion',
        'Return to starting position and punch with your right arm',
        'Continue alternating punches at a steady pace',
      ],
    },
    {
      locale: 'tr-TR',
      name: 'Alternatif Yumruk Atma',
      desc: 'Karın kaslarını çalıştıran ve koordinasyonu geliştiren dinamik bir kardiyovasküler egzersiz.',
      steps: [
        'Ayakları omuz genişliğinde açarak durun',
        'Sol kolunuzu yumruk atma hareketiyle öne doğru uzatın',
        'Başlangıç pozisyonuna dönün ve sağ kolunuzla yumruk atın',
        'Sabit bir tempoda yumrukları alternatif olarak atmaya devam edin',
      ],
    },
  ],
  targetBodyParts: [{ value: 'core' }],
  gif: {
    '180': 'alternate-punching-180.gif',
    '360': 'alternate-punching-360.gif',
    '720': 'alternate-punching-720.gif',
    '1080': 'alternate-punching-1080.gif',
  },

  createdAt: '2025-09-23T12:18:10.721Z',
};

export default ALTERNATE_PUNCHING;
