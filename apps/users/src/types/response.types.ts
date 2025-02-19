import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { Errortype } from './error.types';

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User | any;

  @Field(() => Errortype, { nullable: true })
  error?: Errortype;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user: User | any;

  @Field(() => Errortype, { nullable: true })
  error?: Errortype;
}
