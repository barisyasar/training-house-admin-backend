import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TargetBodyPartsService {
  constructor(private prisma: PrismaService) {}

  async getAllTargetBodyPartsMinimal() {
    return this.prisma.targetBodyPart.findMany({
      select: {
        targetBodyPartId: true,
        translations: {
          where: {
            locale: 'en-US',
          },
          select: {
            label: true,
          },
        },
      },
    });
  }
}
