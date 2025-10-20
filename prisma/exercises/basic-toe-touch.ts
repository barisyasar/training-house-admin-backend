export const BASIC_TOE_TOUCH = {
  exerciseId: 'basic-toe-touch',
  isSided: 'none',
  type: 'exercise',
  measurementType: 'reps' as const,
  reps: 10,
  translations: [
    {
      locale: 'en-US',
      name: 'Basic Toe Touch',
      desc: 'A flexibility exercise that stretches the hamstrings and lower back while improving forward flexibility.',
      steps: [
        'Stand with feet hip-width apart',
        'Slowly bend forward from your hips',
        'Reach toward your toes with your hands',
        'Hold the stretch and slowly return to standing',
      ],
    },
    {
      locale: 'tr-TR',
      name: 'Temel Parmak Ucu Dokunma',
      desc: 'Arka uyluk ve alt sırt kaslarını geren ve öne doğru esnekliği geliştiren esneklik egzersizi.',
      steps: [
        'Ayaklar kalça genişliğinde açık durun',
        'Kalçalarınızdan yavaşça öne doğru eğilin',
        'Ellerinizle parmak uçlarınıza doğru uzanın',
        'Germeyi tutun ve yavaşça ayakta durma pozisyonuna dönün',
      ],
    },
  ],
  targetBodyParts: [{ value: 'core' }],
  gif: {
    1: 'basic-toe-touch_1.gif',
    2: 'basic-toe-touch_2.gif',
    3: 'basic-toe-touch_3.gif',
    4: 'basic-toe-touch_4.gif',
  },

  createdAt: '2025-09-23T12:18:10.722Z',
};

export default BASIC_TOE_TOUCH;
