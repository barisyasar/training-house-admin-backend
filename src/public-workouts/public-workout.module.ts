import { Module } from '@nestjs/common';
import { PublicWorkoutService } from './public-workout.service';
import { PublicWorkoutController } from './public-workout.controller';

@Module({
  controllers: [PublicWorkoutController],
  providers: [PublicWorkoutService],
})
export class PublicWorkoutModule {}
