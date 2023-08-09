/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
//import { Prisma } from '@prisma/client';
import { Customer } from 'lib/entities/customer.entity';
//import { PrismaService } from '../../src/prisma.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
import {
  DeleteCustomerInput,
  GetCustomerInput,
  UpdateCustomerInput,
  VerifyCustomerInput,
  CreateCustomerInput
} from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  /* async findAll(params?: GetCustomerInput) {
    return this.prisma.customer.findMany();
  } */

  async findOne(params: GetCustomerInput) {
    console.log("Param is", params);
    const { where } = params;

    return this.prisma.customer.findUnique({
      where
    });
  }

  //async create(input: Prisma.CustomerUpsertArgs['create']): Promise<Customer> {
    async create(input: CreateCustomerInput): Promise<Customer> {
    //  want to change email id to small letters and encrypt password
    console.log("Inside customer servicessssssssss")
    input.email = input.email.toLowerCase();
    input.password = await bcrypt.hash(input.password, 10);

    return this.prisma.customer.create({ data: input });
  }

  async update(input: UpdateCustomerInput): Promise<Customer | null> {
    return this.prisma.customer.update({
      where: { id: input.id },
      data: input,
    });
  }

  async delete(input: DeleteCustomerInput): Promise<Customer | null> {
    const { id } = input;
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('User not found.');
    }

    return this.prisma.customer.delete({ where: { id } });
  }

  async verifyCustomer(input: VerifyCustomerInput) {
    const row = await this.prisma.customer.findFirst({
      where: {
        email: input.email,
      },
    });

    //if (!row || row.verifyCode !== input.verifyCode)
   if (!row )
    {
      throw new NotAcceptableException('User does not exist.');
    }

    return this.prisma.customer.update({
      where: {
        email: input.email,
      },
      data: {
        //verified: true,
        //verifyCode: undefined,
    
      },
    });
  }
}
