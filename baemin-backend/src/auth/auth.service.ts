import { SignupDto } from './dto/signup.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  encryptPassword(password: string) {
    return bcrypt.hashSync(password, +this.configService.get('SALT_ROUNDS'));
  }

  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async generateUserTokens(userId: string) {
    const accessToken = await this.jwtService.signAsync({ userId });

    return accessToken;
  }

  async signup(signupDto: SignupDto) {
    // Check if user exists
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            email: signupDto.email,
          },
          {
            phone_number: signupDto.phoneNumber,
          },
          {
            username: signupDto.username,
          },
        ],
      },
    });

    if (existingUser) {
      throw new HttpException(
        'The user already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.prismaService.user.create({
      data: {
        first_name: signupDto.firstName,
        last_name: signupDto.lastName,
        username: signupDto.username,
        phone_number: signupDto.phoneNumber,
        email: signupDto.email,
        password: this.encryptPassword(signupDto.password),
      },
    });

    return newUser;
  }

  async login(loginDto: LoginDto) {
    // Check if user exists
    const { loginInfo, password } = loginDto;

    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            email: loginInfo,
          },
          {
            phone_number: loginInfo,
          },
          {
            username: loginInfo,
          },
        ],
      },
    });

    if (!existingUser) {
      throw new HttpException(
        'The user does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Compare password
    const isPasswordCorrect = this.comparePassword(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException('Password is wrong', HttpStatus.BAD_REQUEST);
    }

    const accessToken = await this.generateUserTokens(
      existingUser.id.toString(),
    );

    return { accessToken };
  }
}
