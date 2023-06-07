import {
  IsEmail,
  IsPhoneNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { auth } from '../auth.pb';

export class PageFilters {
  @IsPositive()
  page: number;

  @IsPositive()
  limit: number;
}

export class FindManyUsersRequestDto implements auth.FindManyUsersRequest {
  public readonly pageFilters: PageFilters;
}

export class FindUserByIdRequestDto implements auth.FindUserByIdRequest {
  @IsString()
  public readonly userId: string;
}
