/* eslint-disable prettier/prettier */
import { Prisma } from "@prisma/client";
const date = new Date();
export const customers: Prisma.CustomerUpsertArgs["create"][] = [
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd3',
    email: 'usery@gmail.com',
    password: 'randow-password',
    createdAt: `${date.toISOString()}`,
    updatedAt: `${date.toISOString()}`,
    role: 'User'
  }
 
];
