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
    1: 'back-stretch_1.gif',
    2: 'back-stretch_2.gif',
    3: 'back-stretch_3.gif',
    4: 'back-stretch_4.gif',
  },

  createdAt: '2025-09-23T12:18:10.722Z',
};

export default BACK_STRETCH;
