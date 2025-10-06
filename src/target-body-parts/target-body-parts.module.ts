import { Module } from '@nestjs/common';
import { TargetBodyPartsController } from './target-body-parts.controller';
import { TargetBodyPartsService } from './target-body-parts.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TargetBodyPartsController],
  providers: [TargetBodyPartsService],
  exports: [TargetBodyPartsService],
})
export class TargetBodyPartsModule {}
