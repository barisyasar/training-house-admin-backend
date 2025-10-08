import { Injectable } from '@nestjs/common';
import { CreatePublicWorkoutDto } from './dto/create-public-workout.dto';
import { UpdatePublicWorkoutDto } from './dto/update-public-workout.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LanguageCode } from 'src/types/language-code.enum';
import { PublicWorkoutPaginationDto } from './dto/public-workout-pagination.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PublicWorkoutService {
  constructor(private prisma: PrismaService) {}

  create(createPublicWorkoutDto: CreatePublicWorkoutDto) {
    return 'This action adds a new publicWorkout';
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
            isFeatured: true,
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

  findOne(id: number) {
    return `This action returns a #${id} publicWorkout`;
  }

  update(id: number, updatePublicWorkoutDto: UpdatePublicWorkoutDto) {
    return `This action updates a #${id} publicWorkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicWorkout`;
  }
}
