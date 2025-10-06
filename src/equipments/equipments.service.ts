import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EquipmentsService {
  constructor(private prisma: PrismaService) {}

  async getAllEquipmentsMinimal() {
    return this.prisma.equipment.findMany({
      orderBy: {
        label: 'asc',
      },
      /* fields: {
        label: true,
        equipmentId: true,
      }, */
    });
  }
}
