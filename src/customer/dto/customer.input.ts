/* eslint-disable prettier/prettier */
import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ROLE } from '../../role';
//new code 2023-07-06
//import { ObjectType } from '@nestjs/graphql'; 

@InputType()
export class WhereCustomerInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType()
export class GetCustomerInput {
  @Field(() => String, { nullable: true })
  cursor?: Prisma.CustomerWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => WhereCustomerInput, { nullable: true })
  where: WhereCustomerInput;
}

@InputType()
export class CreateCustomerInput {
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  role: ROLE;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => Boolean, { nullable: true })
  verified?: boolean;

  @Field(() => String, { nullable: true })
  verifyCode?: string;
}

@InputType()
export class UpdateCustomerInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  role?: ROLE;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => Boolean, { nullable: true })
  verified?: boolean;

  @Field(() => String, { nullable: true })
  verifyCode?: string;
}

@InputType()
export class DeleteCustomerInput {
  @Field(() => String, { nullable: true })
  id: string;
}

@InputType()
export class VerifyCustomerInput {
  @Field(() => String)
  email?: string;

  @Field(() => String)
  verifyCode?: string;
}
