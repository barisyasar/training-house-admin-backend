export const ALL_FOURS_SQUAD_STRETCH_LEFT = {
  exerciseId: 'all-fours-squad-stretch-left',
  isSided: 'none',
  type: 'exercise',
  measurementType: 'time' as const,
  duration: 30,
  translations: [
    {
      locale: 'en-US',
      name: 'All Fours Squad Stretch (Left)',
      desc: 'A dynamic stretching exercise performed on hands and knees to improve hip mobility and core stability.',
      steps: [
        'Start on hands and knees in tabletop position',
        'Keep your hands planted and walk your feet closer to your hands',
        'Lower your hips toward your heels while keeping chest up',
        'Hold the stretch and feel it in your hips and calves',
      ],
    },
    {
      locale: 'tr-TR',
      name: 'Dört Ayak Çömelme Germe (Sol)',
      desc: 'Kalça hareketliliğini ve karın stabilitesini geliştirmek için el ve dizler üzerinde yapılan dinamik germe egzersizi.',
      steps: [
        'El ve dizler üzerinde masa pozisyonunda başlayın',
        'Ellerinizi sabit tutun ve ayaklarınızı ellerinize yaklaştırın',
        'Göğsünüzü dik tutarken kalçalarınızı topuklarınıza doğru indirin',
        'Germeyi tutun ve kalça ve baldırlarınızda hissedin',
      ],
    },
  ],
  targetBodyParts: [{ value: 'core' }],
  gif: {
    '180': 'all-fours-squad-stretch-left-180.gif',
    '360': 'all-fours-squad-stretch-left-360.gif',
    '720': 'all-fours-squad-stretch-left-720.gif',
    '1080': 'all-fours-squad-stretch-left-1080.gif',
  },

  createdAt: '2025-09-23T12:18:10.716Z',
};

export default ALL_FOURS_SQUAD_STRETCH_LEFT;
