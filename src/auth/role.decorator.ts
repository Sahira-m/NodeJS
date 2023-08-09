/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

import { ROLE } from '../role';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
