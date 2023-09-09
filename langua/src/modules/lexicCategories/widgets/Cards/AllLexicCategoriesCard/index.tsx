'use client';

import findManyLexicCategories from '@/modules/lexicCategories/api/findManyLexicCategories';
import LexicCategoriesList from '@/modules/lexicCategories/widgets/Lists/LexicCategoriesList';
import useAuth from '@/share/hooks/useAuth';
import useFetch from '@/share/hooks/useFetch';
import { Box, Card, Pagination } from '@mui/material';

const AllLexicCategoriesCard = () => {
    const { auth } = useAuth();

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setFilters((p) => ({ ...p, page: value }));
    };

    const { loading, data, initFetch, totalPages, setFilters, filters } =
        useFetch({
            fetch: findManyLexicCategories,
            params: {
                language: auth.currentVocabulary?.language,
                nativeCategoryLanguage:
                    auth.currentVocabulary?.vocabularyNativeLanguage,
            },
        });
    return (
        <Box
            sx={{
                marginY: '10px',
            }}
        >
            <LexicCategoriesList data={data} loading={loading} />
            <Pagination
                sx={{ display: 'flex', justifyContent: 'center' }}
                size="large"
                shape="rounded"
                count={totalPages}
                onChange={handlePaginationChange}
                page={filters.page}
                variant="outlined"
            />
        </Box>
    );
};

export default AllLexicCategoriesCard;
