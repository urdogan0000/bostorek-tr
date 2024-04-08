/* eslint-disable prettier/prettier */
// src/register/dto/register.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}