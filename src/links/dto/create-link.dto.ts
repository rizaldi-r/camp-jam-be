import { IsString, IsNotEmpty, IsUUID, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  href: string;

  @IsNotEmpty()
  @IsUUID()
  moduleId: string;
}
