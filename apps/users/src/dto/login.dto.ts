import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email is invalid.' })
  email: string;
}
