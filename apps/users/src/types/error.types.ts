import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Errortype {
  @Field()
  message: string;

  @Field({ nullable: true })
  code: string;
}
