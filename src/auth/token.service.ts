/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { ROLE } from '../role';
import { CustomerService } from 'src/customer/customer.service';
import { Customer } from 'src/lib/entities/customer.entity';
import * as dotenv from 'dotenv';

export interface AccessToken {
  sub: string;
  email: string;
  role: ROLE;
}

export interface RefreshToken {
  sub: string;
  email: string;
  role: ROLE;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class TokenService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async generateTokens(customer: Customer): Promise<Tokens> {
    dotenv.config();
    const accessToken = await this.jwtService.signAsync(
      {
        sub: customer.id,
        email: customer.email,
        role: customer.role,
      },
      {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: customer.id,
        email: customer.email,
        role: customer.role,
      },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken( accessToken: string): Promise<RefreshToken> {
    
    return this.jwtService.verifyAsync<RefreshToken>(accessToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
  }
}

 /* async verifyToken(refreshToken: string, accessToken: string): Promise<RefreshToken> {
    
    return this.jwtService.verifyAsync<RefreshToken>(refreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
  }
}
 */
