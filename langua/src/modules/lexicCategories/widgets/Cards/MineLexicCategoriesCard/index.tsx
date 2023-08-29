'use client'

import findManyLexicCategoriesByCreatorId from "@/modules/lexicCategories/api/findManyLexicCategoriesByCreatorId";
import LexicCategoriesList from "@/modules/lexicCategories/widgets/Lists/LexicCategoriesList";
import useAuth from "@/share/hooks/useAuth";
import useFetch from "@/share/hooks/useFetch";
import { Card } from '@mui/material';

const MineLexicCategoriesCard = () => {

  const {auth} = useAuth();

  const {loading:loadingMine,data:dataMine,initFetch:fetchMine} = useFetch({
    fetch: findManyLexicCategoriesByCreatorId,
    params:{
        creatorId: auth.user?.id,
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
        <LexicCategoriesList data={dataMine} loading={loadingMine}/>
    </Card>
  )
}

export default MineLexicCategoriesCard