import { Controller, Get } from '@nestjs/common';
import { TargetBodyPartsService } from './target-body-parts.service';

@Controller('target-body-parts')
export class TargetBodyPartsController {
  constructor(
    private readonly targetBodyPartsService: TargetBodyPartsService,
  ) {}

  @Get('/minimal')
  async getAllTargetBodyPartsMinimal() {
    return this.targetBodyPartsService.getAllTargetBodyPartsMinimal();
  }
}
