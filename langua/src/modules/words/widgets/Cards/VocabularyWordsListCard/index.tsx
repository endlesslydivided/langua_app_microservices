'use client'

import findManyWordsByVocabularyId from '@/modules/words/api/findManyWordsByVocabularyId';
import updateWordToVocabulary from '@/modules/words/api/updateWordToVocabulary';
import { Word } from '@/modules/words/types/model';
import CircularLoader from '@/share/components/CircularLoader';
import { MessageType } from '@/share/consts/errorMessages';
import useAuth from '@/share/hooks/useAuth';
import useFetch from '@/share/hooks/useFetch';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import WordsTable from '../../Lists/WordsTable';

interface VocabularyWordsListCardProps
{
}

const VocabularyWordsListCard:React.FC<VocabularyWordsListCardProps> = ({}) => {

    const {auth} = useAuth();

    const {loading,data,setData,initFetch,filters,totalPages,setFilters} = useFetch({
        fetch: findManyWordsByVocabularyId,
        params:{
            vocabularyId:auth.currentVocabulary?.id,
        }
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setFilters((p) => ({...p,page:newPage}));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((p) => ({page:0,limit:parseInt(event.target.value, 10)}));
    };

    const onClickUpdateHandler = async(word:Word) =>
    {
        try
        {
            await updateWordToVocabulary({
                id:word.wordToVocabulary?.[0]?.id,
                userId:auth.user?.id || '',
                isFinished:!word.wordToVocabulary?.[0]?.isFinished
            });
            toast(MessageType.SUCCESSFULL_FINISH, {autoClose: 10000, type: "success" });
            setData((p) => {
                return p.map((i) =>
                {
                    return i.id === word.id ? {
                        ...word,
                        wordToVocabulary:{...word.wordToVocabulary,isFinished:!word.wordToVocabulary?.[0]?.isFinished}
                    } : i
                })
            })
        }
        catch(error:any)
        {
            toast(error.reason ?? MessageType.SERVER_ERROR, {autoClose: 10000, type: "error" });
        }
    }

    const actions = (word:Word) => 
    <Stack direction="row">
        <IconButton onClick={() => onClickUpdateHandler(word)}>
            {
                word.wordToVocabulary?.[0]?.isFinished ? 
                <CloseIcon color={'error'} onClick={() => onClickUpdateHandler(word)}/> :  
                <CheckIcon color={'primary'} onClick={() => onClickUpdateHandler(word)}/>
            }
        </IconButton>
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

export default VocabularyWordsListCard