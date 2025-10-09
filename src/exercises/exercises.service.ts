import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Prisma } from '@prisma/client';
import { promises as fs } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { logWithDate } from 'src/common/utils/logger.util';
import { LanguageCode } from 'src/types/language-code.enum';
import { ExercisePaginationDto } from './dto/exercise-pagination.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async createExercise(
    exerciseData: CreateExerciseDto,
    gifFiles?: Express.Multer.File[],
  ): Promise<any> {
    // Generate unique exerciseId
    const exerciseId = randomUUID();
    const gifUrls: { size: 180 | 360 | 720 | 1080; url: string }[] = [];

    if (gifFiles && gifFiles.length > 0) {
      const exerciseDir = join(
        process.cwd(),
        'public',
        'exercises',
        'gifs',
        exerciseId,
      );
      await fs.mkdir(exerciseDir, { recursive: true });

      for (const file of gifFiles) {
        const fileName = `${file.originalname}`;
        const filePath = join(exerciseDir, fileName);
        await fs.writeFile(filePath, file.buffer);

        const sizeMatch = fileName.match(/(\d+)/);
        const size = sizeMatch
          ? (parseInt(sizeMatch[1]) as 180 | 360 | 720 | 1080)
          : 360;

        gifUrls.push({
          size,
          url: `/public/exercises/gifs/${exerciseId}/${fileName}`,
        });
      }
    }

    const hasEquipments = 'equipments' in exerciseData;
    const hasTargetBodyParts = 'targetBodyParts' in exerciseData;

    const exercise = await this.prisma.exercise.create({
      data: {
        exerciseId,
        type: 'exercise',
        measurementType: exerciseData.measurementType,
        duration:
          exerciseData.measurementType === 'time'
            ? (exerciseData as any).duration
            : null,
        reps:
          exerciseData.measurementType === 'reps'
            ? (exerciseData as any).reps
            : null,
        isEachSide:
          exerciseData.measurementType === 'reps'
            ? (exerciseData as any).isEachSide
            : null,
        translations: {
          create: exerciseData.translations.map((translation) => ({
            locale: translation.locale,
            name: translation.name,
            desc: translation.desc,
            steps: {
              create: translation.steps.map((step, index) => ({
                value: step.value,
                order: index + 1,
              })),
            },
          })),
        },
        equipments:
          hasEquipments && exerciseData.equipments
            ? {
                create: exerciseData.equipments.map((equipment) => ({
                  equipmentId: equipment.equipmentId,
                })),
              }
            : undefined,
        targetBodyParts:
          hasTargetBodyParts && exerciseData.targetBodyParts
            ? {
                create: exerciseData.targetBodyParts.map((bodyPart) => ({
                  targetBodyPartId: bodyPart.targetBodyPartId,
                })),
              }
            : undefined,
        gifs:
          gifUrls.length > 0
            ? {
                create: gifUrls.map((gif) => ({
                  size: gif.size,
                  url: gif.url,
                })),
              }
            : undefined,
      },
      include: {
        translations: {
          include: {
            steps: true,
          },
        },
        equipments: true,
        targetBodyParts: true,
        gifs: true,
      },
    });

    logWithDate(`Exercise created: ${exercise.exerciseId}`);

    return exercise;
  }

  async getExerciseById(exerciseId: string): Promise<any> {
    return this.prisma.exercise.findUnique({
      where: { exerciseId },
      include: {
        translations: {
          include: {
            steps: true,
          },
          orderBy: {
            locale: 'desc',
          },
        },
        equipments: {
          select: {
            equipmentId: true,
          },
        },
        targetBodyParts: {
          select: {
            targetBodyPartId: true,
          },
        },
        gifs: {
          orderBy: {
            size: 'asc',
          },
        },
      },
    });
  }

  async getAllExercises(query: ExercisePaginationDto) {
    const {
      pageIndex = 0,
      pageSize = 20,
      search = '',
      sortBy = 'exerciseId',
      sortOrder = 'asc',
      measurementTypes,
    } = query;

    const where: Prisma.ExerciseWhereInput = {
      ...(measurementTypes?.length
        ? {
            measurementType: {
              in: measurementTypes,
            },
          }
        : {}),
      translations: {
        some: {
          locale: LanguageCode.EN_US,
          ...(search
            ? {
                OR: [
                  {
                    name: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              }
            : {}),
        },
      },
    };

    const [total, exercises] = await Promise.all([
      this.prisma.exercise.count({ where }),
      this.prisma.exercise.findMany({
        where,
        skip: pageIndex * pageSize,
        take: pageSize,
        orderBy: {
          [sortBy]: sortOrder,
        },
        select: {
          exerciseId: true,
          type: true,
          measurementType: true,
          duration: true,
          reps: true,
          isEachSide: true,
          createdAt: true,
          translations: {
            where: { locale: LanguageCode.EN_US },
            select: {
              exerciseTranslationId: true,
              locale: true,
              name: true,
            },
          },
          equipments: {
            select: {
              equipmentId: true,
            },
          },
          targetBodyParts: {
            select: {
              targetBodyPartId: true,
            },
          },
          gifs: {
            select: {
              size: true,
              url: true,
            },
            orderBy: {
              size: 'asc',
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      items: exercises,
      meta: {
        pageIndex,
        pageSize,
        total,
        totalPages,
        hasNext: pageIndex < totalPages - 1,
        hasPrev: pageIndex > 0,
      },
    };
  }

  async findAllMinimal() {
    return this.prisma.exercise.findMany({
      select: {
        exerciseId: true,
        reps: true,
        duration: true,
        isEachSide: true,
        measurementType: true,
        translations: { where: { locale: LanguageCode.EN_US } },
        gifs: {
          select: {
            url: true,
          },
          where: {
            size: 360,
          },
        },
      },
    });
  }

  async updateExercise(
    exerciseId: string,
    exerciseData: UpdateExerciseDto,
    gifFiles?: Express.Multer.File[],
  ): Promise<any> {
    const gifUrls: { size: 180 | 360 | 720 | 1080; url: string }[] = [];

    const existingGifs = await this.prisma.exerciseGif.findMany({
      where: { exerciseId },
    });

    if (gifFiles && gifFiles.length > 0) {
      const exerciseDir = join(
        process.cwd(),
        'public',
        'exercises',
        'gifs',
        exerciseId,
      );
      await fs.mkdir(exerciseDir, { recursive: true });

      for (const file of gifFiles) {
        const timestamp = Date.now(); // Use current timestamp as version
        const fileName = `${file.originalname.split('.')[0]}_${timestamp}.${file.originalname.split('.')[1]}`;
        const filePath = join(exerciseDir, fileName);
        await fs.writeFile(filePath, file.buffer);

        const sizeMatch = fileName.match(/(\d+)/);
        const size = sizeMatch
          ? (parseInt(sizeMatch[1]) as 180 | 360 | 720 | 1080)
          : 360;

        // Check if a GIF of this size already exists
        const existingGif = existingGifs.find((gif) => gif.size === size);
        if (existingGif) {
          // Delete the existing GIF entry
          await this.prisma.exerciseGif.delete({
            where: { exerciseGifId: existingGif.exerciseGifId },
          });
        }

        gifUrls.push({
          size,
          url: `/public/exercises/gifs/${exerciseId}/${fileName}`,
        });
      }
    }

    const hasEquipments = 'equipments' in exerciseData;
    const hasTargetBodyParts = 'targetBodyParts' in exerciseData;

    // Remove existing translations and steps
    await this.prisma.exerciseTranslation.deleteMany({
      where: { exerciseId },
    });
    await this.prisma.exerciseStep.deleteMany({
      where: { exerciseTranslation: { exerciseId } },
    });

    // Remove existing equipments and target body parts
    await this.prisma.exerciseEquipment.deleteMany({
      where: { exerciseId },
    });
    await this.prisma.exerciseTargetBodyPart.deleteMany({
      where: { exerciseId },
    });

    const updatedExercise = await this.prisma.exercise.update({
      where: { exerciseId },
      data: {
        measurementType: exerciseData.measurementType,
        duration:
          exerciseData.measurementType === 'time'
            ? exerciseData.duration
            : null,
        reps:
          exerciseData.measurementType === 'reps' ? exerciseData.reps : null,
        isEachSide:
          exerciseData.measurementType === 'reps'
            ? exerciseData.isEachSide
            : null,
        translations: {
          create: exerciseData.translations?.map((translation) => ({
            locale: translation.locale,
            name: translation.name,
            desc: translation.desc,
            steps: {
              create: translation.steps.map((step, index) => ({
                value: step.value,
                order: index + 1,
              })),
            },
          })),
        },
        equipments:
          hasEquipments && exerciseData.equipments
            ? {
                create: exerciseData.equipments.map((equipment) => ({
                  equipmentId: equipment.equipmentId,
                })),
              }
            : undefined,
        targetBodyParts:
          hasTargetBodyParts && exerciseData.targetBodyParts
            ? {
                create: exerciseData.targetBodyParts.map((bodyPart) => ({
                  targetBodyPartId: bodyPart.targetBodyPartId,
                })),
              }
            : undefined,
        gifs:
          gifUrls.length > 0
            ? {
                create: gifUrls.map((gif) => ({
                  size: gif.size,
                  url: gif.url,
                })),
              }
            : undefined,
      },
      include: {
        translations: {
          include: {
            steps: true,
          },
        },
        equipments: true,
        targetBodyParts: true,
        gifs: true,
      },
    });

    logWithDate(`Exercise updated: ${exerciseId}`);

    return updatedExercise;
  }

  async deleteExercise(id: string): Promise<any> {
    /* return this.prisma.exercise.delete({
      where: { id },
    }); */
  }
}
