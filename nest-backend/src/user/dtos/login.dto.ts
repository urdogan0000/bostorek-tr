/* eslint-disable prettier/prettier */
// src/login/dto/login.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}