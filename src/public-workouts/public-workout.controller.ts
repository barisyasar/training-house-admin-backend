import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PublicWorkoutService } from './public-workout.service';
import { CreatePublicWorkoutDto } from './dto/create-public-workout.dto';
import { UpdatePublicWorkoutDto } from './dto/update-public-workout.dto';
import { PublicWorkoutPaginationDto } from './dto/public-workout-pagination.dto';

@Controller('public-workouts')
export class PublicWorkoutController {
  constructor(private readonly publicWorkoutService: PublicWorkoutService) {}

  @Post()
  create(@Body() createPublicWorkoutDto: CreatePublicWorkoutDto) {
    return this.publicWorkoutService.create(createPublicWorkoutDto);
  }

  @Get()
  findAll(@Query() query: PublicWorkoutPaginationDto) {
    return this.publicWorkoutService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicWorkoutService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicWorkoutDto: UpdatePublicWorkoutDto,
  ) {
    return this.publicWorkoutService.update(+id, updatePublicWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicWorkoutService.remove(+id);
  }
}
