/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

import { customers } from './seeds/customers';
//console.log("Inside Prisma");
const prisma = new PrismaClient();

export async function main() {
  for (const customer of customers) {
    //console.log("Inside Prisma");
    await prisma.customer.upsert({
      where: { id: customer.id },
      update: {},
      create: customer,
    });
  }
  console.log(`Created ${customers.length} customers`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
