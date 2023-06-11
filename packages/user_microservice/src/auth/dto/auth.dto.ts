import {
  IsEmail,
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

  @IsString()
  public readonly sex: string;

  @IsString()
  public readonly birthday: string;

  @IsString()
  public readonly country: string;

  @IsString()
  @MaxLength(50)
  public readonly city: string;

  @IsString()
  @MaxLength(50)
  public readonly nativeLanguage: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  public readonly nickname: string;

  @IsPhoneNumber()
  public readonly phoneNumber: string;
}

export class ValidateRequestDto implements auth.ValidateRequest {
  @IsString()
  public readonly token: string;
}
