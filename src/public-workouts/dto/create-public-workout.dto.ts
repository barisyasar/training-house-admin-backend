import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { LanguageCode } from '../../types/language-code.enum';
import { ExerciseType, MeasurementType } from '@prisma/client';

class TranslationDto {
  @IsEnum(LanguageCode)
  locale: LanguageCode;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  desc: string;
}

class CategoryDto {
  @IsUUID()
  categoryId: string;
}

class GoalDto {
  @IsUUID()
  goalId: string;
}

class PlanDto {
  @IsUUID()
  planId: string;
}

class ExerciseDto {
  @IsUUID()
  exerciseId: string;
}

class ExerciseItemDto {
  @ValidateNested()
  @Type(() => ExerciseDto)
  exercise: ExerciseDto;

  @IsEnum(ExerciseType)
  type: ExerciseType;

  @IsEnum(MeasurementType)
  measurementType: MeasurementType;

  @IsInt()
  @Min(0)
  duration?: number;

  @IsInt()
  @Min(0)
  reps?: number;

  @IsInt()
  @Min(1)
  orderNumber: number;
}

export class CreatePublicWorkoutDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  translations: TranslationDto[];

  @IsInt()
  @Min(0)
  duration: number;

  @IsInt()
  @Min(0)
  calories: number;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsBoolean()
  isFeatured: boolean;

  @IsArray()
  @IsObject({ each: true })
  banners: Record<string, any>[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories: CategoryDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoalDto)
  goals: GoalDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => PlanDto)
  plan: PlanDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseItemDto)
  exercises: ExerciseItemDto[];
}
