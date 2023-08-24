import { gql } from "@apollo/client";
import { baseFetch } from "../baseFetch";
import { Pagination } from "../types";


export const FIND_MANY_LEXIC_CATEGORIES = gql`query FindManyLexicCategories($limit: Int $page: Int) {
    findManyLexicCategories(limit: $limit, page: $page) {
        count
        rows {
            categoryName
            createdAt
            creatorUserId
            id
            updatedAt
        }
    }
}`

const findManyLexicCategories = async ({page,limit}:Pagination) =>
{
    try
    {
        const data = await baseFetch({
            query:FIND_MANY_LEXIC_CATEGORIES,
            variables:{
                page,
                limit
            }, 
        });
        
        return data.findManyLexicCategories;

    }
    catch(error)
    {
        throw error;
    }
    
}

export default findManyLexicCategories;