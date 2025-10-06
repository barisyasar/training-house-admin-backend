import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { MeasurementType } from '@prisma/client';
import { Transform } from 'class-transformer';

export class ExercisePaginationDto extends PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value]; // wrap single string into array
  })
  @IsArray()
  measurementTypes?: MeasurementType[];
}
