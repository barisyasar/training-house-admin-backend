import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
  Patch,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Query } from '@nestjs/common';
import { ExercisePaginationDto } from './dto/exercise-pagination.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('gifs', 4, {
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/gif') {
          cb(null, true);
        } else {
          cb(new Error('Only GIF files are allowed'), false);
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  create(
    @Body('exercise') exerciseDataString: string,
    @UploadedFiles() gifFiles?: Express.Multer.File[],
  ) {
    const exerciseData: CreateExerciseDto = JSON.parse(exerciseDataString);

    return this.exercisesService.createExercise(exerciseData, gifFiles);
  }

  @Get()
  findAll(@Query() query: ExercisePaginationDto) {
    return this.exercisesService.getAllExercises(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.getExerciseById(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('gifs', 4, {
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/gif') {
          cb(null, true);
        } else {
          cb(new Error('Only GIF files are allowed'), false);
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body('exercise') exerciseDataString: string,
    @UploadedFiles() gifFiles?: Express.Multer.File[],
  ) {
    const exerciseData = JSON.parse(exerciseDataString);
    return this.exercisesService.updateExercise(id, exerciseData, gifFiles);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.deleteExercise(id);
  }
}
