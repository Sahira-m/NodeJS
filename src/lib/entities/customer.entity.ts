/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'lib/entities/base.entity';

@ObjectType()
export class Customer extends Base {
  @Field(() => String)
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;
}
