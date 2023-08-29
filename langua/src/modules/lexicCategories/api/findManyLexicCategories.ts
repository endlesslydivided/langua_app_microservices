import { baseFetch } from "@/share/api/baseFetch";
import { Pagination } from "@/share/api/types";
import { gql } from "@apollo/client";
import { FindManyLexicCategoriesParams } from "../types/api";



export const FIND_MANY_LEXIC_CATEGORIES = gql`query FindManyLexicCategories($limit: Int, $page: Int, 
    $language: String!, $nativeCategoryLanguage: String!) {
    findManyLexicCategories(limit: $limit, page: $page, language: $language, nativeCategoryLanguage: $nativeCategoryLanguage) {
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

const findManyLexicCategories = async ({page,limit,language,nativeCategoryLanguage}:FindManyLexicCategoriesParams) =>
{
    try
    {
        const data = await baseFetch({
            query:FIND_MANY_LEXIC_CATEGORIES,
            variables:{
                page,
                limit,
                nativeCategoryLanguage,
                language
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