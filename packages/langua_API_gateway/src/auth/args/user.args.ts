
import { ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from '../../share/args/pagination.args';

@ArgsType()
export class FindManyUsersArgs extends PaginationArgs {

}

