import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/user/user.repository';
import { StudentsModule } from 'src/students/students.module';
import { InstructorsModule } from 'src/instructors/instructors.module';

@Module({
  imports: [StudentsModule, InstructorsModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
