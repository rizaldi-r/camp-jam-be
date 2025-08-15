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

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // TODO: add dynamic path
      envFilePath: `.env`,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
