import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { InstructorsModule } from './instructors/instructors.module';
import { CoursesModule } from './courses/courses.module';
import { CategoriesModule } from './categories/categories.module';
import { SectionsModule } from './sections/sections.module';
import { ModulesModule } from './modules/modules.module';
import { SubmissionTemplatesModule } from './submission-templates/submission-templates.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ModuleProgressModule } from './module-progress/module-progress.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // TODO: add dynamic path
      envFilePath: `.env`,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 50,
        },
      ],
    }),
    AuthModule,
    UserModule,
    StudentsModule,
    StudentsModule,
    InstructorsModule,
    CoursesModule,
    CategoriesModule,
    SectionsModule,
    ModulesModule,
    SubmissionTemplatesModule,
    SubmissionsModule,
    EnrollmentsModule,
    ModuleProgressModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // Apply the ThrottlerGuard globally
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
