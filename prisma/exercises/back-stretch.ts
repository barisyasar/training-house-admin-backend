export const BACK_STRETCH = {
  exerciseId: 'back-stretch',
  isSided: 'none',
  type: 'exercise',
  measurementType: 'time',
  duration: 20,
  translations: [
    {
      locale: 'en-US',
      name: 'Back Stretch',
      desc: 'A gentle stretching exercise that relieves tension in the back muscles and improves spinal mobility.',
      steps: [
        'Sit or stand with good posture',
        'Interlace your fingers and reach arms overhead',
        'Gently lean to one side, feeling the stretch along your back',
        'Return to center and repeat on the other side',
      ],
    },
    {
      locale: 'tr-TR',
      name: 'Sırt Germe',
      desc: 'Sırt kaslarındaki gerginliği gideren ve omurga hareketliliğini geliştiren nazik germe egzersizi.',
      steps: [
        'İyi duruşla oturun veya ayakta durun',
        'Parmaklarınızı birleştirin ve kolları başın üzerine uzatın',
        'Sırtınız boyunca germeyi hissederek nazikçe bir yana eğilin',
        'Merkeze dönün ve diğer tarafta tekrarlayın',
      ],
    },
  ],
  targetBodyParts: [{ value: 'back' }],
  gif: {
    '180': 'back-stretch-180.gif',
    '360': 'back-stretch-360.gif',
    '720': 'back-stretch-720.gif',
    '1080': 'back-stretch-1080.gif',
  },

  createdAt: '2025-09-23T12:18:10.722Z',
};

export default BACK_STRETCH;
