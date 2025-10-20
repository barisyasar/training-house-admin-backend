export const ARM_CROSSOVER = {
  exerciseId: 'arm-crossover',
  isSided: 'none',
  type: 'exercise',
  measurementType: 'time',
  duration: 15,
  translations: [
    {
      locale: 'en-US',
      name: 'Arm Crossover',
      desc: 'A shoulder flexibility exercise that stretches the posterior deltoid and improves shoulder mobility.',
      steps: [
        'Stand tall with good posture',
        'Bring one arm across your chest',
        'Use your opposite hand to gently pull the arm closer',
        'Hold the stretch and repeat on the other side',
      ],
    },
    {
      locale: 'tr-TR',
      name: 'Kol Çaprazlama',
      desc: 'Arka omuz kasını geren ve omuz hareketliliğini geliştirir.',
      steps: [
        'Dik duruşla ayakta durun',
        'Bir kolunuzu göğsünüzün karşısına getirin',
        'Diğer elinizi kullanarak kolu nazikçe yaklaştırın',
        'Germeyi tutun ve diğer tarafta tekrarlayın',
      ],
    },
  ],
  targetBodyParts: [{ value: 'core' }],
  gif: {
    1: 'arm-crossover_1.gif',
    2: 'arm-crossover_2.gif',
    3: 'arm-crossover_3.gif',
    4: 'arm-crossover_4.gif',
  },

  createdAt: '2025-09-23T12:18:10.722Z',
};

export default ARM_CROSSOVER;
