/**
* This file is auto-generated by nestjs-proto-gen-ts
*/

import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const AUTH_SERVICE_NAME = 'AuthService'

export namespace auth {
    export interface AuthService {
        signUp(
            data: SignUpRequest,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<SignUpResponse>;
        signIn(
            data: SignInRequest,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<SignInResponse>;
        validate(
            data: ValidateRequest,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<ValidateResponse>;
        findUserById(
            data: FindUserByIdRequest,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<FindUserByIdResponse>;
        findManyUsers(
            data: FindManyUsersRequest,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<FindManyUsersResponse>;
    }
    export interface PageFilters {
        page?: number;
        limit?: number;
    }
    export interface SignUpRequest {
        email?: string;
        password?: string;
        firstname?: string;
        surname?: string;
        sex?: string;
        birthday?: string;
        country?: string;
        city?: string;
        nativeLanguage?: string;
        nickname?: string;
        phoneNumber?: string;
    }
    export interface SignUpResponse {
        status?: number;
        error?: string[];
    }
    export interface SignInRequest {
        email?: string;
        password?: string;
    }
    export interface SignInResponse {
        status?: number;
        error?: string[];
        token?: string;
    }
    export interface ValidateRequest {
        token?: string;
    }
    export interface ValidateResponse {
        status?: number;
        error?: string[];
        userId?: string;
    }
    export interface FindUserByIdRequest {
        userId?: string;
    }
    export interface FindUserByIdResponse {
        status?: number;
        error?: string[];
        user?: FindUserByIdResponse.User;
    }
    export namespace FindUserByIdResponse {
        export interface User {
            id?: string;
            firstname?: string;
            surname?: string;
            sex?: string;
            birthday?: string;
            country?: string;
            city?: string;
            nativeLanguage?: string;
            userContacts?: User.UserContacts;
        }
        export namespace User {
            export interface UserContacts {
                email?: string;
                phoneNumber?: string;
            }
        }
    }
    export interface FindManyUsersData {
        count?: number;
        rows?: FindUserByIdResponse.User[];
    }
    export interface FindManyUsersRequest {
        pageFilters?: auth.PageFilters;
    }
    export interface FindManyUsersResponse {
        status?: number;
        error?: string[];
        data?: auth.FindManyUsersData;
    }
}

