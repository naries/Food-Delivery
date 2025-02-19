import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

interface UserData {
  email: string;
  phone_number: string;
  password: string;
  name: string;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  //register user
  async registerUser(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phone_number } = registerDto;
    const isEmailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExists) {
      throw new BadRequestException('User already exists with this email!');
    }

    const isPhoneNumberExists = await this.prisma.user.findUnique({
      where: {
        phone_number,
      },
    });

    if (isPhoneNumberExists) {
      throw new BadRequestException(
        'User already exists with this phone number!',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword, phone_number };

    const activationToken = await this.createActivationToken(user);

    const activationCode = activationToken.activationCode;

    // const user = await this.prisma.user.create({
    //   data: { name, email, password: hashedPassword, phone_number },
    // });

    return { user, response };
  }

  //login user
  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = { email, password };

    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({});

    return users;
  }

  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000);
    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: process.env.ACTIVATION_SECRET,
        expiresIn: '5m',
      },
    );

    return { token, activationCode };
  }
}
