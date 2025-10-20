import { LanguageCode } from './language-code.enum';

export type TExerciseMeasurementType = 'time' | 'reps';

export type TExerciseEquipment = {
  label: string;
  value: string;
  id: string;
};

export type TTargetBodyPart = {
  value: string;
  label: string;
  id: string;
};

type TExerciseBase = {
  id: string;
};

export type TExerciseCommon = TExerciseBase & {
  translations: {
    locale: LanguageCode.TR | LanguageCode.EN_US;
    name: string;
    desc: string;
    steps: {
      value: string;
      stepId: string;
    }[];
  }[];
  equipments: TExerciseEquipment[];
  targetBodyParts: TTargetBodyPart[];
  gifs: {
    order: number;
    url: string;
  }[];
  createdAt: string;
};

export type TExerciseTime = TExerciseCommon & {
  type: 'exercise';
  measurementType: 'time';
  duration: number;
};

export type TExerciseReps = TExerciseCommon & {
  type: 'exercise';
  measurementType: 'reps';
  reps: number;
  isEachSide: boolean;
};

export type TExerciseRest = TExerciseBase & {
  type: 'rest';
  measurementType: 'time';
  duration: number;
};

export type TExercise = TExerciseTime | TExerciseReps | TExerciseRest;
