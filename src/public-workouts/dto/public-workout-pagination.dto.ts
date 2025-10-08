import { IsArray, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { Transform } from 'class-transformer';

export class PublicWorkoutPaginationDto extends PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
  })
  @IsArray()
  levels?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
  })
  @IsArray()
  plans?: string[];
}
