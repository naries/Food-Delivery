import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterResponse } from './types/response.types';
import { RegisterDto } from './dto/register.dto';
import { BadRequestException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { Response } from 'express';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('resiterInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.email || !registerDto.password || !registerDto.name) {
      throw new BadRequestException('Please fill in al the fields');
    }
    const user = await this.usersService.registerUser(registerDto, context.res);

    return { user };
  }

  @Query(() => [User])
  async getUsers() {
    return this.usersService.getAllUsers();
  }
}
