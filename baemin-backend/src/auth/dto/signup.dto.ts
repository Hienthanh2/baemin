import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @MinLength(1)
  @IsString()
  firstName: string;

  @MinLength(1)
  @IsString()
  lastName: string;

  @MinLength(1)
  @IsString()
  username: string;

  @MinLength(1)
  @IsString()
  phoneNumber: string;

  @MinLength(1)
  @IsEmail()
  email: string;

  @MinLength(1)
  @IsString()
  password: string;
}
