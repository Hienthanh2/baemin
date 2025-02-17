import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @MinLength(1)
  @IsString()
  loginInfo: string;

  @MinLength(1)
  @IsString()
  password: string;
}
