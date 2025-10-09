import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { LanguageCode } from 'src/types/language-code.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  create(createPlanDto: CreatePlanDto) {
    return 'This action adds a new plan';
  }

  findAllMinimal() {
    return this.prisma.plan.findMany({
      select: {
        planId: true,
        translations: {
          where: { locale: LanguageCode.EN_US },
        },
      },
    });
  }

  findAll() {
    return `This action returns all plans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
