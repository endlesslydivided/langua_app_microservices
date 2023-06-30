import { ObjectType } from "@nestjs/graphql";
import { ResponseModel } from "../../share/model/status.model";


@ObjectType()
export class SignInResponse extends ResponseModel(String) {}

@ObjectType()
export class SignUpResponse extends ResponseModel(String) {}