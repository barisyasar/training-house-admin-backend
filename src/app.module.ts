import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExercisesModule } from './exercises/exercises.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { TargetBodyPartsModule } from './target-body-parts/target-body-parts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PublicWorkoutModule } from './public-workouts/public-workout.module';
import { CategoriesModule } from './categories/categories.module';
import { PlansModule } from './plans/plans.module';
import { GoalsModule } from './goals/goals.module';

@Module({
  imports: [
    PrismaModule,
    ExercisesModule,
    EquipmentsModule,
    TargetBodyPartsModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public/',
      serveStaticOptions: {
        index: false,
        fallthrough: true,
      },
    }),
    PublicWorkoutModule,
    CategoriesModule,
    PlansModule,
    GoalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
