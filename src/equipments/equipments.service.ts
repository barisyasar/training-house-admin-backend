import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EquipmentsService {
  constructor(private prisma: PrismaService) {}

  async getAllEquipmentsMinimal() {
    return this.prisma.equipment.findMany({
      select: {
        equipmentId: true,
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
