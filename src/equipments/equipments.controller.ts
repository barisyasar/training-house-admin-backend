import { Controller, Get } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';

@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Get('/minimal')
  async getAllEquipmentsMinimal() {
    return this.equipmentsService.getAllEquipmentsMinimal();
  }
}
