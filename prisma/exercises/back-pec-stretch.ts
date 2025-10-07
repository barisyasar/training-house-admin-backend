export const BACK_PEC_STRETCH = {
  exerciseId: 'back-pec-stretch',
  isSided: 'none',
  type: 'exercise',
  measurementType: 'time',
  duration: 20,
  translations: [
    {
      locale: 'en-US',
      name: 'Back Pec Stretch',
      desc: 'A stretching exercise that targets the pectoral muscles and improves chest and shoulder flexibility.',
      steps: [
        'Stand facing a wall or doorway',
        'Place your forearm against the wall at shoulder height',
        'Step forward and lean into the stretch',
        'Feel the stretch in your chest and hold',
      ],
    },
    {
      locale: 'tr-TR',
      name: 'Arka Göğüs Germe',
      desc: 'Göğüs kaslarını hedefleyen ve göğüs ile omuz esnekliğini geliştiren germe egzersizi.',
      steps: [
        'Duvara veya kapı çerçevesine bakarak durun',
        'Önkolunuzu omuz hizasında duvara koyun',
        'Öne doğru adım atın ve germeye doğru eğilin',
        'Göğsünüzde germeyi hissedin ve tutun',
      ],
    },
  ],
  targetBodyParts: [{ value: 'back' }],
  gif: {
    '180': 'back-pec-stretch-180.gif',
    '360': 'back-pec-stretch-360.gif',
    '720': 'back-pec-stretch-720.gif',
    '1080': 'back-pec-stretch-1080.gif',
  },

  createdAt: '2025-09-23T12:18:10.722Z',
};

export default BACK_PEC_STRETCH;
