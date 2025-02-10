import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "./users.service";
import { RegisterResponse } from "./types/response.types";
import { RegisterDto } from "./dto/register.dto";
import { BadRequestException } from "@nestjs/common";

@Resolver('User')
export class UsersResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation(() => RegisterResponse)
    async register(
        @Args('resiterInput') registerDto: RegisterDto,
    ): Promise<RegisterResponse> {
        if (!registerDto.email || !registerDto.password || !registerDto.name) {
            throw new BadRequestException("Please fill in al lthe fields");
        }
        const user = await this.userService.registerUser(registerDto);

        return { user };
    }
}