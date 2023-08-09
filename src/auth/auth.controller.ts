/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from '../dto/auth.input';
import { Tokens } from './token.service';
import { CreateCustomerInput } from 'src/dto/cutomer.signup';
@Controller('auth')
export class AuthController {
  
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
     //async signUp(@Body('input') input: SignUpDto): Promise<Tokens> {
  async signUp(@Body('input') input: CreateCustomerInput) {
    console.log(input);
    try {
      //return this.authService.signUp(input);
       this.authService.signUp(input);
    } catch (error) {
      throw new Error("Yente message");
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
