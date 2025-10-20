import { Injectable } from '@nestjs/common';
import { CreatePublicWorkoutDto } from './dto/create-public-workout.dto';
import { UpdatePublicWorkoutDto } from './dto/update-public-workout.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LanguageCode } from 'src/types/language-code.enum';
import { PublicWorkoutPaginationDto } from './dto/public-workout-pagination.dto';
import { Prisma } from '@prisma/client';
import { promises as fs } from 'fs';
import { join } from 'path';
import { logWithDate } from 'src/common/utils/logger.util';

@Injectable()
export class PublicWorkoutService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPublicWorkoutDto: CreatePublicWorkoutDto,
    banners: Express.Multer.File[],
  ) {
    const bannerUrls: { order: number; url: string }[] = [];

    // Verify plan exists
    const plan = await this.prisma.plan.findUnique({
      where: {
        planId: createPublicWorkoutDto.plan.planId,
      },
    });

    if (!plan) {
      throw new Error(
        `Plan with ID ${createPublicWorkoutDto.plan.planId} not found. Please provide a valid plan ID.`,
      );
    }

    const publicWorkout = await this.prisma.publicWorkout.create({
      data: {
        duration: createPublicWorkoutDto.duration,
        calories: createPublicWorkoutDto.calories,
        level: createPublicWorkoutDto.level,
        isFeatured: createPublicWorkoutDto.isFeatured,
        translations: {
          create: createPublicWorkoutDto.translations.map((translation) => ({
            locale: translation.locale,
            name: translation.name,
            desc: translation.desc,
          })),
        },
        categories: {
          connect: createPublicWorkoutDto.categories.map((category) => ({
            categoryId: category.categoryId,
          })),
        },
        goals: {
          connect: createPublicWorkoutDto.goals.map((goal) => ({
            goalId: goal.goalId,
          })),
        },
        plan: {
          connect: {
            planId: createPublicWorkoutDto.plan.planId,
          },
        },
        exercises: {
          create: createPublicWorkoutDto.exercises.map((exerciseItem) => ({
            orderNumber: exerciseItem.orderNumber,
            type: exerciseItem.type,
            measurementType: exerciseItem.measurementType,
            duration:
              exerciseItem.measurementType === 'time'
                ? (exerciseItem.duration ?? 0)
                : 0,
            reps:
              exerciseItem.measurementType === 'reps'
                ? (exerciseItem.reps ?? 0)
                : 0,
            exercise: {
              connect: {
                exerciseId: exerciseItem.exercise.exerciseId,
              },
            },
          })),
        },
      },
      include: {
        translations: true,
        categories: true,
        goals: true,
        plan: true,
        exercises: true,
        banners: true,
      },
    });

    if (banners && banners.length > 0) {
      const workoutDir = join(
        process.cwd(),
        'public',
        'public-workouts',
        publicWorkout.publicWorkoutId,
      );
      await fs.mkdir(workoutDir, { recursive: true });

      for (let i = 0; i < banners.length; i++) {
        const file = banners[i];
        const timestamp = Date.now();
        const fileName = `${i + 1}_${timestamp}.${file.originalname.split('.')[1]}`;
        const filePath = join(workoutDir, fileName);
        await fs.writeFile(filePath, file.buffer);

        bannerUrls.push({
          order: i + 1,
          url: `/public/public-workouts/${publicWorkout.publicWorkoutId}/${fileName}`,
        });
      }

      // Create banner records after files are saved
      await this.prisma.publicWorkoutBanner.createMany({
        data: bannerUrls.map((banner) => ({
          publicWorkoutId: publicWorkout.publicWorkoutId,
          order: banner.order,
          url: banner.url,
        })),
      });
    }

    logWithDate(`Public workout created: ${publicWorkout.publicWorkoutId}`);

    return;
  }

  async findAll(query: PublicWorkoutPaginationDto) {
    const {
      pageIndex = 0,
      pageSize = 20,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      levels,
      plans,
    } = query;

    try {
      const where = {
        translations: {
          some: {
            locale: LanguageCode.EN_US,
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        },
        ...(levels?.length
          ? {
              level: {
                in: levels,
              },
            }
          : {}),
        ...(plans?.length
          ? {
              plan: {
                translations: {
                  some: {
                    locale: LanguageCode.EN_US,
                    label: {
                      in: plans,
                    },
                  },
                },
              },
            }
          : {}),
      };

      const [total, publicWorkouts] = await Promise.all([
        this.prisma.publicWorkout.count({ where }),
        this.prisma.publicWorkout.findMany({
          where,
          select: {
            publicWorkoutId: true,
            level: true,
            createdAt: true,
            translations: {
              where: {
                locale: LanguageCode.EN_US,
              },
              select: {
                name: true,
              },
            },
            plan: {
              select: {
                translations: {
                  where: {
                    locale: LanguageCode.EN_US,
                  },
                  select: {
                    label: true,
                  },
                },
              },
            },
          },
          skip: pageIndex * pageSize,
          take: pageSize,
          orderBy: {
            [sortBy]: sortOrder,
          },
        }),
      ]);

      const totalPages = Math.ceil(total / pageSize);

      return {
        items: publicWorkouts,
        meta: {
          pageIndex,
          pageSize,
          total,
          totalPages,
          hasNext: pageIndex < totalPages - 1,
          hasPrev: pageIndex > 0,
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(publicWorkoutId: string) {
    return this.prisma.publicWorkout.findUnique({
      where: { publicWorkoutId },
      select: {
        publicWorkoutId: true,
        duration: true,
        calories: true,
        level: true,
        isFeatured: true,
        createdAt: true,
        translations: {
          select: {
            locale: true,
            name: true,
            desc: true,
          },
        },
        categories: {
          select: {
            categoryId: true,
          },
        },
        goals: {
          select: {
            goalId: true,
          },
        },
        plan: {
          select: {
            planId: true,
          },
        },
        exercises: {
          orderBy: {
            orderNumber: 'asc',
          },
          select: {
            orderNumber: true,
            type: true,
            measurementType: true,
            duration: true,
            reps: true,
            exercise: {
              select: {
                exerciseId: true,
                translations: {
                  where: {
                    locale: LanguageCode.EN_US,
                  },
                  select: {
                    name: true,
                    locale: true,
                  },
                },
              },
            },
          },
        },
        banners: {
          select: {
            order: true,
            url: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async update(
    publicWorkoutId: string,
    updatePublicWorkoutDto: UpdatePublicWorkoutDto,
    banners?: Express.Multer.File[],
  ) {
    const bannerUrls: { order: number; url: string }[] = [];

    const existingBanners = await this.prisma.publicWorkoutBanner.findMany({
      where: { publicWorkoutId },
    });

    if (banners && banners.length > 0) {
      const workoutDir = join(
        process.cwd(),
        'public',
        'public-workouts',
        publicWorkoutId,
      );
      await fs.mkdir(workoutDir, { recursive: true });

      for (let i = 0; i < banners.length; i++) {
        const file = banners[i];
        const timestamp = Date.now();
        // Extract order number from filename (e.g., "workout_1" -> 1)
        const orderMatch = file.originalname.match(/_(\d+)/);
        const orderNumber = orderMatch ? parseInt(orderMatch[1]) : 1;

        const fileName = `${orderNumber}_${timestamp}.${file.originalname.split('.')[1]}`;
        const filePath = join(workoutDir, fileName);
        await fs.writeFile(filePath, file.buffer);

        const existingBanner = existingBanners.find(
          (banner) => banner.order === orderNumber,
        );

        if (existingBanner) {
          // Delete the old file
          try {
            const oldFilePath = join(process.cwd(), existingBanner.url);
            await fs.unlink(oldFilePath);
          } catch (error) {
            logWithDate(
              `Failed to delete old banner file: ${existingBanner.url}`,
            );
          }

          // Delete the existing banner entry
          await this.prisma.publicWorkoutBanner.delete({
            where: {
              publicWorkoutBannerId: existingBanner.publicWorkoutBannerId,
            },
          });
        }

        bannerUrls.push({
          order: orderNumber,
          url: `/public/public-workouts/${publicWorkoutId}/${fileName}`,
        });
      }
    }

    await this.prisma.$transaction([
      this.prisma.publicWorkoutTranslation.deleteMany({
        where: { publicWorkoutId },
      }),
      this.prisma.publicWorkout.update({
        where: { publicWorkoutId },
        data: {
          categories: { set: [] },
          goals: { set: [] },
        },
      }),
      this.prisma.publicWorkoutExercise.deleteMany({
        where: { publicWorkoutId },
      }),
    ]);

    const updatedPublicWorkout = await this.prisma.publicWorkout.update({
      where: { publicWorkoutId },
      data: {
        duration: updatePublicWorkoutDto.duration ?? 0,
        calories: updatePublicWorkoutDto.calories ?? 0,
        level: updatePublicWorkoutDto.level ?? '',
        isFeatured: updatePublicWorkoutDto.isFeatured ?? false,
        translations: {
          create:
            updatePublicWorkoutDto.translations?.map((translation) => ({
              locale: translation.locale,
              name: translation.name,
              desc: translation.desc,
            })) ?? [],
        },
        categories: {
          connect:
            updatePublicWorkoutDto.categories?.map((category) => ({
              categoryId: category.categoryId,
            })) ?? [],
        },
        goals: {
          connect:
            updatePublicWorkoutDto.goals?.map((goal) => ({
              goalId: goal.goalId,
            })) ?? [],
        },
        plan: updatePublicWorkoutDto.plan
          ? {
              connect: {
                planId: updatePublicWorkoutDto.plan.planId,
              },
            }
          : undefined,
        exercises: {
          create:
            updatePublicWorkoutDto.exercises?.map((exerciseItem) => ({
              orderNumber: exerciseItem.orderNumber,
              type: exerciseItem.type,
              measurementType: exerciseItem.measurementType,
              duration:
                exerciseItem.measurementType === 'time'
                  ? (exerciseItem.duration ?? 0)
                  : 0,
              reps:
                exerciseItem.measurementType === 'reps'
                  ? (exerciseItem.reps ?? 0)
                  : 0,
              exercise: {
                connect: {
                  exerciseId: exerciseItem.exercise.exerciseId,
                },
              },
            })) ?? [],
        },
        banners:
          bannerUrls.length > 0
            ? {
                create: bannerUrls.map((banner) => ({
                  order: banner.order,
                  url: banner.url,
                })),
              }
            : undefined,
      },
      select: {
        publicWorkoutId: true,
        duration: true,
        calories: true,
        level: true,
        isFeatured: true,
        createdAt: true,
        translations: {
          select: {
            locale: true,
            name: true,
            desc: true,
          },
        },
        categories: {
          select: {
            categoryId: true,
          },
        },
        goals: {
          select: {
            goalId: true,
          },
        },
        plan: {
          select: {
            planId: true,
          },
        },
        exercises: {
          orderBy: {
            orderNumber: 'asc',
          },
          select: {
            orderNumber: true,
            type: true,
            measurementType: true,
            duration: true,
            reps: true,
            exercise: {
              select: {
                exerciseId: true,
                translations: {
                  where: {
                    locale: LanguageCode.EN_US,
                  },
                  select: {
                    name: true,
                    locale: true,
                  },
                },
              },
            },
          },
        },
        banners: {
          select: {
            order: true,
            url: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    logWithDate(`Public workout updated: ${publicWorkoutId}`);

    return updatedPublicWorkout;
  }

  remove(id: number) {
    return `This action removes a #${id} publicWorkout`;
  }
}
