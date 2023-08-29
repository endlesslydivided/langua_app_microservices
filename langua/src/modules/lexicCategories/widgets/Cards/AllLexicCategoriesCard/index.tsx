'use client'

import findManyLexicCategories from "@/modules/lexicCategories/api/findManyLexicCategories";
import LexicCategoriesList from "@/modules/lexicCategories/widgets/Lists/LexicCategoriesList";
import useAuth from "@/share/hooks/useAuth";
import useFetch from "@/share/hooks/useFetch";
import { Card } from '@mui/material';

const AllLexicCategoriesCard = () => {

    const {auth} = useAuth();

    const {loading:loadingAll,data:dataAll,initFetch:fetchAll} = useFetch({
        fetch: findManyLexicCategories,
        params:{
            language: auth.currentVocabulary?.language,
            nativeCategoryLanguage: auth.currentVocabulary?.vocabularyNativeLanguage,
        }
    });
  return (
    <Card sx={{
        padding:'5px',
        borderRadius:'15px',
        marginY:'10px'
      }}>
        <LexicCategoriesList data={dataAll} loading={loadingAll}/>
    </Card>
  )
}

export default AllLexicCategoriesCard