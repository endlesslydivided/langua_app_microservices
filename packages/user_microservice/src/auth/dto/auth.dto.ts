import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { auth } from '../auth.pb';

export class SignInRequestDto implements auth.SignInRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class SignUpRequestDto implements auth.SignUpRequest {
  @IsEmail()
  public readonly email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(25)
  public readonly password: string;

  @IsString()
  @MaxLength(50)
  public readonly firstname: string;

  @IsString()
  @MaxLength(50)
  public readonly surname: string;

  @IsOptional()
  @IsString()
  public readonly sex: string;

  @IsOptional()
  @IsString()
  public readonly birthday: string;

  @IsOptional()
  @IsString()
  public readonly country: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  public readonly city: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  public readonly nativeLanguage: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(25)
  public readonly nickname: string;

  @IsOptional()
  @IsPhoneNumber()
  public readonly phoneNumber: string;
}

export class ValidateRequestDto implements auth.ValidateRequest {
  @IsString()
  public readonly accessToken: string;
}

export class RefreshRequestDto implements auth.RefreshRequest {
  @IsString()
  public readonly refreshToken: string;
}