import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckEmailAvailabilityDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CheckUsernameAvailabilityDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
