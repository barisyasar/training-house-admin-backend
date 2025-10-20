import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PublicWorkoutService } from './public-workout.service';
import { CreatePublicWorkoutDto } from './dto/create-public-workout.dto';
import { UpdatePublicWorkoutDto } from './dto/update-public-workout.dto';
import { PublicWorkoutPaginationDto } from './dto/public-workout-pagination.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('public-workouts')
export class PublicWorkoutController {
  constructor(private readonly publicWorkoutService: PublicWorkoutService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('banners', 1, {
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg') {
          cb(null, true);
        } else {
          cb(new Error('Only JPEG files are allowed'), false);
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  create(
    @Body('publicWorkout') createPublicWorkoutDto: string,
    @UploadedFiles() banners: Express.Multer.File[],
  ) {
    const publicWorkoutData: CreatePublicWorkoutDto = JSON.parse(
      createPublicWorkoutDto,
    );

    return this.publicWorkoutService.create(publicWorkoutData, banners);
  }

  @Get()
  findAll(@Query() query: PublicWorkoutPaginationDto) {
    return this.publicWorkoutService.findAll(query);
  }

  @Get(':publicWorkoutId')
  findOne(@Param('publicWorkoutId') publicWorkoutId: string) {
    return this.publicWorkoutService.findOne(publicWorkoutId);
  }

  @Patch(':publicWorkoutId')
  @UseInterceptors(
    FilesInterceptor('banners', 1, {
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg') {
          cb(null, true);
        } else {
          cb(new Error('Only JPEG files are allowed'), false);
        }
      },
    }),
  )
  update(
    @Param('publicWorkoutId') publicWorkoutId: string,
    @Body('publicWorkout') updatePublicWorkoutDto: string,
    @UploadedFiles() banners: Express.Multer.File[],
  ) {
    const publicWorkoutData: UpdatePublicWorkoutDto = JSON.parse(
      updatePublicWorkoutDto,
    );
    return this.publicWorkoutService.update(
      publicWorkoutId,
      publicWorkoutData,
      banners,
    );
  }
}
