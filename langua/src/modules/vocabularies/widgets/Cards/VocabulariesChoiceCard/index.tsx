'use client';

import findManyVocabulariesByUserId from '@/modules/vocabularies/api/findManyVocabulariesByUserId';
import VocabulariesList from '@/modules/vocabularies/widgets/Lists/VocabulariesList';
import FabDialog from '@/share/components/FabDialog';
import useAuth from '@/share/hooks/useAuth';
import useFetch from '@/share/hooks/useFetch';
import ExitIcont from '@mui/icons-material/ExitToApp';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Fab,
    Pagination,
} from '@mui/material';
import React from 'react';

const VocabulariecChoiceCard = () => {
    const { auth, logOut } = useAuth();

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setFilters((p) => ({ ...p, page: value }));
    };

    const { loading, data, filters, setFilters, count, totalPages } = useFetch({
        fetch: findManyVocabulariesByUserId,
        params: {
            userId: auth.user?.id,
        },
    });

    const handleFabClick = () => {
        logOut();
    };

    return (
        <Card
            sx={{
                width: '75%',
                height: '75%',
                px: '0px',
                py: '0px',
                overflowY: 'auto',
            }}
        >
            <Box
                sx={{
                    position: 'sticky',
                    top: '0',
                    width: '100%',
                    zIndex: '2',
                }}
            >
                <CardHeader title={`Choose your vocabulary:`} />
            </Box>

            <CardContent
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    px: '15px',
                    py: '5px',
                }}
            >
                <VocabulariesList loading={loading} data={data} />
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'sticky',
                    bottom: '0',
                    top: '100%',
                    zIndex: '2',
                }}
            >
                <Pagination
                    size="large"
                    shape="rounded"
                    count={totalPages}
                    onChange={handlePaginationChange}
                    page={filters.page}
                    variant="outlined"
                />
            </CardActions>

            <Fab
                variant="extended"
                onClick={handleFabClick}
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    margin: '25px',
                }}
            >
                <ExitIcont />
                Exit
            </Fab>
        </Card>
    );
};

export default VocabulariecChoiceCard;
