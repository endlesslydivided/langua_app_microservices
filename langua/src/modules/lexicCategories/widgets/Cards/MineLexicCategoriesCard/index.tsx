'use client'

import findManyLexicCategoriesByCreatorId from "@/modules/lexicCategories/api/findManyLexicCategoriesByCreatorId";
import LexicCategoriesList from "@/modules/lexicCategories/widgets/Lists/LexicCategoriesList";
import FabDialog from "@/share/components/FabDialog";
import useAuth from "@/share/hooks/useAuth";
import useFetch from "@/share/hooks/useFetch";
import { Box, Pagination } from '@mui/material';
import CreateLexicCategoryForm from "../../Forms/CreateLexicCategoryForm";
import AddIcon from '@mui/icons-material/Add'
const MineLexicCategoriesCard = () => {

  const {auth} = useAuth();
  
  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setFilters((p) => ({...p,page:value}));
  };
  
  const {loading,data,initFetch,filters,totalPages,setFilters} = useFetch({
      fetch: findManyLexicCategoriesByCreatorId,
      params:{
          creatorId: auth.user?.id,
          language: auth.currentVocabulary?.language,
          nativeCategoryLanguage: auth.currentVocabulary?.vocabularyNativeLanguage,
      }
  });
  return (
    <Box sx={{
      marginY:'10px'
    }}>
        <LexicCategoriesList data={data} loading={loading}/>
        <FabDialog buttonIcon={<AddIcon/>} buttonTitle="Add category" dialogTitle="Create new category">
          <CreateLexicCategoryForm creationCallback={initFetch}/>
        </FabDialog>
        <Pagination sx={{display:'flex',justifyContent:'center'}} size="large" shape="rounded" count={totalPages} 
        onChange={handlePaginationChange} page={filters.page} variant="outlined" />
    </Box>
  )
}

export default MineLexicCategoriesCard