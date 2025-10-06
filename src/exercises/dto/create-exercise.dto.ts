import {
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LanguageCode } from '../../types/language-code.enum';

class ExerciseStepDto {
  @IsString()
  @IsNotEmpty()
  value: string;
}

class ExerciseTranslationDto {
  @IsEnum(LanguageCode)
  locale: LanguageCode;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseStepDto)
  steps: ExerciseStepDto[];
}

export class ExerciseEquipmentDto {
  @IsString()
  @IsNotEmpty()
  equipmentId: string;
}

export class TargetBodyPartDto {
  @IsString()
  @IsNotEmpty()
  targetBodyPartId: string;
}

export class CreateExerciseDto {
  @IsEnum(['time', 'reps'])
  measurementType: 'time' | 'reps';

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  reps?: number;

  @IsOptional()
  @IsBoolean()
  isEachSide?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseTranslationDto)
  translations: ExerciseTranslationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseEquipmentDto)
  equipments?: ExerciseEquipmentDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TargetBodyPartDto)
  targetBodyParts?: TargetBodyPartDto[];

  gifs: Express.Multer.File[];
}
