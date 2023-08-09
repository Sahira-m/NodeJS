/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginCustomerInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
