export const ASSISTED_ROTATING_NECK_STRETCH_LEFT = {
  exerciseId: 'assisted-rotating-neck-stretch-left',
  isSided: 'none',
  type: 'exercise',
  measurementType: 'time',
  duration: 12,
  translations: [
    {
      locale: 'en-US',
      name: 'Assisted Rotating Neck Stretch (Left)',
      desc: 'A gentle neck stretch that uses hand assistance to improve neck rotation and relieve tension.',
      steps: [
        'Sit or stand with good posture',
        'Place one hand on the side of your head',
        'Gently assist the rotation of your head to one side',
        'Hold the stretch and repeat on the other side',
      ],
    },
    {
      locale: 'tr-TR',
      name: 'Destekli Boyun Döndürme Germe (Sol)',
      desc: 'Boyun dönüşünü geliştirmek ve gerginliği gidermek için el desteği kullanan nazik boyun germe egzersizi.',
      steps: [
        'İyi duruşla oturun veya ayakta durun',
        'Bir elinizi başınızın yanına koyun',
        'Başınızın bir yana dönüşüne nazikçe yardım edin',
        'Germeyi tutun ve diğer tarafta tekrarlayın',
      ],
    },
  ],
  targetBodyParts: [{ value: 'neck' }],
  gif: {
    '180': 'assisted-rotating-neck-stretch-left-180.gif',
    '360': 'assisted-rotating-neck-stretch-left-360.gif',
    '720': 'assisted-rotating-neck-stretch-left-720.gif',
    '1080': 'assisted-rotating-neck-stretch-left-1080.gif',
  },

  createdAt: '2025-09-23T12:18:10.722Z',
};

export default ASSISTED_ROTATING_NECK_STRETCH_LEFT;
