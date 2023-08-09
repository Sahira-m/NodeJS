/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';

 @InputType()
 export class CreateCustomerInput {
  @Field(() => String)
  email?: string;

  @Field(() => String)
  password?: string;

  @Field(() => String)
  name?: string;

  @Field(() => String)
  role?: string;

  @Field(() => String)
  createdAt?: string;
    
  @Field(() => String)
  updatedAt?: string;   
} 

/* type CreateCustomerInput = {
 
  email?: string
  password?: string;
  name?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;   
} */
  