'use client'

import createWordToVocabulary from '@/modules/words/api/createWordToVocabulary';
import findManyWordsByLexicCategoryId from '@/modules/words/api/findManyWordsByLexicCategoryId';
import { Word } from '@/modules/words/types/model';
import CircularLoader from '@/share/components/CircularLoader';
import { MessageType } from '@/share/consts/errorMessages';
import useAuth from '@/share/hooks/useAuth';
import useFetch from '@/share/hooks/useFetch';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import WordsTable from '../../Lists/WordsTable';

interface AllWordsListCardProps
{
    lexicCategoryId: string;
}

const AllWordsListCard:React.FC<AllWordsListCardProps> = ({lexicCategoryId}) => {

    const {auth} = useAuth();
  
    const {loading,data,initFetch,filters,totalPages,setFilters} = useFetch({
        fetch: findManyWordsByLexicCategoryId,
        params:{
            vocabularyId: auth.currentVocabulary?.id,
            lexicCategoryId
        }
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setFilters((p) => ({...p,page:newPage}));
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((p) => ({page:0,limit:parseInt(event.target.value, 10)}));
    };

    const onClickCreateHandler = async(word:Word) =>
    {
        try
        {
            await createWordToVocabulary({wordId:word.id,vocabularyId:auth.currentVocabulary?.id || ''});
            toast(MessageType.SUCCESSFULL_FINISH, {autoClose: 10000, type: "success" });
        }
        catch(error:any)
        {
            toast(error.reason ?? MessageType.SERVER_ERROR, {autoClose: 10000, type: "error" });
        }
    }

    const actions = (word:Word) => 
    <Stack direction="row">
        <Tooltip title={!!word.wordToVocabulary ? 'Word is already in vocabulary' : 'Add to vocabulary'}>    
            <IconButton disabled={!!word.wordToVocabulary} onClick={() => onClickCreateHandler(word)}>
                <AddOutlinedIcon/>
            </IconButton>
        </Tooltip>
    </Stack>

  return (
    <Box sx={{
        marginY:'10px'
      }}>
        {
            loading ? <CircularLoader/> : 
            <WordsTable
                data={data}
                actions={actions}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                count={totalPages}
                rowsPerPage={filters.limit}
                page={filters.page - 1}
            />
        }
    </Box>
  )
}

export default AllWordsListCard