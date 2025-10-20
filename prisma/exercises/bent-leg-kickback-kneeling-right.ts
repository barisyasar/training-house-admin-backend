export const BENT_LEG_KICKBACK_KNEELING_RIGHT = {
  exerciseId: 'bent-leg-kickback-kneeling-right',
  isSided: 'none',
  type: 'exercise',
  measurementType: 'reps',
  reps: 10,
  translations: [
    {
      locale: 'en-US',
      name: 'Kneeling Bent Leg Kickback (Right)',
      desc: 'A glute strengthening exercise performed on hands and knees that targets the gluteus maximus.',
      steps: [
        'Start on hands and knees in tabletop position',
        'Keep one knee bent at 90 degrees',
        'Lift your bent leg up toward the ceiling',
        'Lower back down with control and repeat',
      ],
    },
    {
      locale: 'tr-TR',
      name: 'Diz Üstü Bükülü Bacak Geri Tekme (Sağ)',
      desc: 'El ve dizler üzerinde yapılan ve büyük kalça kasını hedefleyen kalça güçlendirme egzersizi.',
      steps: [
        'El ve dizler üzerinde masa pozisyonunda başlayın',
        'Bir dizinizi 90 derece bükülü tutun',
        'Bükülü bacağınızı tavana doğru kaldırın',
        'Kontrollü bir şekilde aşağı indirin ve tekrarlayın',
      ],
    },
  ],
  targetBodyParts: [{ value: 'back' }, { value: 'legs' }, { value: 'glutes' }],
  gif: {
    1: 'bent-leg-kickback-kneeling-right_1.gif',
    2: 'bent-leg-kickback-kneeling-right_2.gif',
    3: 'bent-leg-kickback-kneeling-right_3.gif',
    4: 'bent-leg-kickback-kneeling-right_4.gif',
  },

  createdAt: '2025-09-23T12:18:10.722Z',
};

export default BENT_LEG_KICKBACK_KNEELING_RIGHT;
