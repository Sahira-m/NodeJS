/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';


@Module({
  imports: [],
  controllers: [],
  providers: [CustomerService, PrismaService, CustomerResolver],
  exports: [CustomerService]

})
export class CustomerModule {}
