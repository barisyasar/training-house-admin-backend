import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LanguageCode } from 'src/types/language-code.enum';
import { sleep } from 'src/common/utils/sleep.util';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAllMinimal() {
    await sleep(3000);
    return this.prisma.category.findMany({
      select: {
        categoryId: true,
        translations: {
          where: {
            locale: LanguageCode.EN_US,
          },
          select: {
            label: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      select: {
        categoryId: true,
        translations: {
          where: {
            locale: LanguageCode.EN_US,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
