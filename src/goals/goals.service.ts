import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { LanguageCode } from 'src/types/language-code.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  create(createGoalDto: CreateGoalDto) {
    return 'This action adds a new goal';
  }

  findAll() {
    return `This action returns all goals`;
  }

  findAllMinimal() {
    return this.prisma.goal.findMany({
      select: {
        goalId: true,
        translations: { where: { locale: LanguageCode.EN_US } },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} goal`;
  }

  update(id: number, updateGoalDto: UpdateGoalDto) {
    return `This action updates a #${id} goal`;
  }

  remove(id: number) {
    return `This action removes a #${id} goal`;
  }
}
