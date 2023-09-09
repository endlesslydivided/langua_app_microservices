'use client';

import createWordToVocabulary from '@/modules/words/api/createWordToVocabulary';
import findManyWordsByLexicCategoryId from '@/modules/words/api/findManyWordsByLexicCategoryId';
import updateWordToVocabulary from '@/modules/words/api/updateWordToVocabulary';
import { Word } from '@/modules/words/types/model';
import CircularLoader from '@/share/components/CircularLoader';
import FabDialog from '@/share/components/FabDialog';
import { MessageType } from '@/share/consts/errorMessages';
import { BaseException } from '@/share/exceptions/base.exception';
import useAuth from '@/share/hooks/useAuth';
import useFetch from '@/share/hooks/useFetch';
import AddIcon from '@mui/icons-material/Add';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';

import CreateWordForm from '../../Forms/CreateWordForm';
import WordsTable from '../../Lists/WordsTable';

interface MineWordsListCardProps {
    lexicCategoryId: string;
}

const MineWordsListCard: React.FC<MineWordsListCardProps> = ({
    lexicCategoryId,
}) => {
    const { auth } = useAuth();

    const {
        loading,
        data,
        setData,
        initFetch,
        filters,
        totalPages,
        setFilters,
    } = useFetch({
        fetch: findManyWordsByLexicCategoryId,
        params: {
            vocabularyId: auth.currentVocabulary?.id,
            lexicCategoryId,
        },
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setFilters((p) => ({ ...p, page: newPage }));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setFilters((p) => ({
            page: 0,
            limit: parseInt(event.target.value, 10),
        }));
    };

    const onClickCreateHandler = async (word: Word) => {
        try {
            await createWordToVocabulary({
                wordId: word.id,
                vocabularyId: auth.currentVocabulary?.id || '',
            });
            toast(MessageType.SUCCESSFULL_FINISH, {
                autoClose: 10000,
                type: 'success',
            });
        } catch (error: BaseException | any) {
            toast(error.reason ?? MessageType.SERVER_ERROR, {
                autoClose: 10000,
                type: 'error',
            });
        }
    };

    const actions = (word: Word) => (
        <Stack direction="row">
            <Tooltip
                title={
                    !!word.wordToVocabulary
                        ? 'Word is already in vocabulary'
                        : 'Add to vocabulary'
                }
            >
                <IconButton
                    disabled={!!word.wordToVocabulary}
                    onClick={() => onClickCreateHandler(word)}
                >
                    <AddOutlinedIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );

    return (
        <Box
            sx={{
                marginY: '10px',
            }}
        >
            {loading ? (
                <CircularLoader />
            ) : (
                <WordsTable
                    data={data}
                    actions={actions}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    count={totalPages}
                    rowsPerPage={filters.limit}
                    page={filters.page - 1}
                />
            )}
            <FabDialog
                buttonIcon={<AddIcon />}
                buttonTitle="Add word"
                dialogTitle="Create new word"
            >
                <CreateWordForm
                    lexicCategoryId={lexicCategoryId}
                    creationCallback={initFetch}
                />
            </FabDialog>
        </Box>
    );
};

export default MineWordsListCard;
