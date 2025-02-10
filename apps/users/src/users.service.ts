import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  //register user
  async registerUser(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const user = {
      name, email, password
    }

    return user;
  }

  //login user
  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = { email, password };

    return user;
  }


  async getAllUsers() {
    const users = [
      { name: "Name", "email": "email@address.com", password: "1234" }
    ];

    return users;
  }
}
