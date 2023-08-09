/* eslint-disable prettier/prettier */
import {
  Body,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash } from 'bcryptjs';
//import { randomBytes } from 'crypto';
import { ROLE } from '../role';

import { CustomerService } from '../customer/customer.service';
import { SignUpDto } from '../dto/auth.input';
import { RefreshToken, Tokens, TokenService } from './token.service';
import { resolve } from 'path';
import { CreateCustomerInput } from '../dto/cutomer.signup';
import { Args, Mutation } from '@nestjs/graphql';
import { Customer } from '@prisma/client';



@Injectable()
export class AuthService {

  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}
 //async signUp(input: SignUpDto): Promise<Tokens> {
 // @Mutation(return=>Post)
  //async signUp(@Args('input') input: CreateCustomerInput)
  //createCustomer(input: CreateCustomerInput!): Customer!
 
 async signUp(input:CreateCustomerInput)
  //(input: CreateCustomerInput)
  {
   // type Mutation= signUp(input: CustomerSignUpInput)
    console.log("Hello signup  input  ",input);
    
    console.log("Email is",input.email);
    console.log("password is", input.password);
    //const email = 'abc@gmail.com';
    //const password="dhhdjdko"

   /*  const existingCustomer = await this.customerService.findOne({
      where: {email },
    });
 */
   /*  if (existingCustomer) {
      throw new Error('An account with specified email already exists.');
    } */

    /* const hashedPassword = await hash(password, 10);
    const customer = await this.customerService.create({
      email,
      password: hashedPassword,
      role: ROLE.User, 
      //verifyCode: randomBytes(4).toString('hex'),
    });*/

    //return this.tokenService.generateTokens(customer);
  }

  async signIn(email: string, password: string): Promise<Tokens> {
    console.log(email,"EEEEEEEEEEEEEe");
    const customer = await this.customerService.findOne({
      where: { email },
    });

    if (
      !customer ||
      //!customer.verified ||
      !compareSync(password, customer.password)
    ) {
      throw new NotFoundException('Invalid credentials');
    }

    return this.tokenService.generateTokens(customer);
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    let customer;

    try {
      const payload = await this.tokenService.verifyToken(refreshToken);

      customer = await this.customerService.findOne({
        where: { email: payload.email },
      });
    } catch (err) {
      throw new UnauthorizedException('Token error');
    }

    if (!customer) {
      throw new UnauthorizedException('User not found');
    }

   /*  if (!customer.verified) {
      throw new NotAcceptableException('User not verified');
    } */

    return this.tokenService.generateTokens(customer);
  }
}
