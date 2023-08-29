import { baseFetch } from "@/share/api/baseFetch";
import { gql } from "@apollo/client";
import { FindManyLexicCategoriesByCreatorIdParams } from "../types/api";



export const FIND_MANY_LEXIC_CATEGORIES_BY_CREATOR_ID = gql`query FindManyLexicCategoriesByCreatorId($limit: Int, $page: Int, 
    $language: String!, $nativeCategoryLanguage: String!,$creatorId: String!) {
    findManyLexicCategoriesByCreatorId(
        creatorId: $creatorId,
        limit: $limit,
        page: $page,
        language:$language,
        nativeCategoryLanguage:$nativeCategoryLanguage
    ) {
        count
        rows {
            categoryName
            creatorUserId
        }
    }
}
`

const findManyLexicCategoriesByCreatorId = async ({page,limit,language,nativeCategoryLanguage,creatorId}:FindManyLexicCategoriesByCreatorIdParams) =>
{
    try
    {
        const data = await baseFetch({
            query:FIND_MANY_LEXIC_CATEGORIES_BY_CREATOR_ID,
            variables:{
                page,
                limit,
                nativeCategoryLanguage,
                language,
                creatorId
            }, 
        });
        
        return data.findManyLexicCategoriesByCreatorId;

    }
    catch(error)
    {
        throw error;
    }
    
}

export default findManyLexicCategoriesByCreatorId;