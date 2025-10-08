import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicWorkoutDto } from './create-public-workout.dto';

export class UpdatePublicWorkoutDto extends PartialType(CreatePublicWorkoutDto) {}
