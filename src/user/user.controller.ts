import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/req/update-user.dto';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BodyTransformerInterceptor } from 'src/_common/interceptors/body-transformer.interceptor';
import { Roles } from 'src/_common/decorators/roles.decorator';
import { CurrentUser } from 'src/_common/decorators/current-user.decorator';
import { FindAllUsersQueryDto } from 'src/user/dto/req/find-all-users-query.dto';
import {
  CheckEmailAvailabilityDto,
  CheckUsernameAvailabilityDto,
} from 'src/user/dto/req/check-user-availability.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(BodyTransformerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('ADMIN')
  @Get()
  async findAll(@Query() query: FindAllUsersQueryDto) {
    return this.userService.findAll(query);
  }

  @Get('/profile')
  async getProfile(@CurrentUser() user: User) {
    return this.userService.findById(user.id);
  }

  @Get('check-email')
  async checkEmailAvailability(@Query() query: CheckEmailAvailabilityDto) {
    const isAvailable = await this.userService.isEmailAvailable(query.email);
    return { isAvailable };
  }

  @Get('check-username')
  async checkUsernameAvailability(
    @Query() query: CheckUsernameAvailabilityDto,
  ) {
    const isAvailable = await this.userService.isUsernameAvailable(
      query.username,
    );
    return { isAvailable };
  }

  @Patch('/profile')
  async updateProfile(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Roles('ADMIN')
  @Patch(':id/role')
  async updateUserRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userService.updateUserRole(id, updateUserRoleDto);
  }

  @Delete()
  async removeCurrentUser(@CurrentUser() user: User) {
    return this.userService.remove(user.id);
  }

  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
