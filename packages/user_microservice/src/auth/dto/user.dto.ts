import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { auth } from '../auth.pb';

export class PageFilters implements auth.PageFilters {
  @IsNumber()
  @Min(0)
  public readonly page: number;

  @IsNumber()
  @Min(1)
  public readonly limit: number;
}

export class FindManyUsersRequestDto implements auth.FindManyUsersRequest {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PageFilters)
  public readonly pageFilters: PageFilters;
}

export class FindUserByIdRequestDto implements auth.FindUserByIdRequest {
  @IsString()
  public readonly userId: string;
}

export class UpdateUserDto implements auth.UpdateUserRequest {

  @IsString()
  public readonly id: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(25)
  public readonly password: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  public readonly firstname: string;

  @IsOptional()
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
