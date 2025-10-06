import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TargetBodyPartsService {
  constructor(private prisma: PrismaService) {}

  async getAllTargetBodyPartsMinimal() {
    return this.prisma.targetBodyPart.findMany({
      orderBy: {
        label: 'asc',
      },
      /*     fields: {
        label: true,
        targetBodyPartId: true,
      }, */
    });
  }
}
