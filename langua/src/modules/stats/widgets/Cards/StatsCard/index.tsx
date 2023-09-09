'use client';

import getOverallVocabularyStats from '@/modules/stats/api/getOverallVocabularyStats';
import SummarySection from '@/modules/stats/components/SummarySection';
import useAuth from '@/share/hooks/useAuth';
import useFetch from '@/share/hooks/useFetch';
import { Article, Book, List, Message } from '@mui/icons-material';
import { Grid } from '@mui/material';
import React from 'react';

const StatsCard = async () => {
    const { auth } = useAuth();

    const data = await getOverallVocabularyStats({
        userId: auth.user?.id || '',
    });

    return (
        <Grid container sx={{ height: '100%' }} spacing={3}>
            <Grid item xs={6} sm={6} md={6}>
                <SummarySection
                    sx={{ height: '100%' }}
                    title="Words added"
                    total={data.totalLearnedMaterials || 0}
                    icon={<Article />}
                />
            </Grid>

            <Grid item xs={6} sm={6} md={6}>
                <SummarySection
                    sx={{ height: '100%' }}
                    title="Words learned"
                    total={data.totalLearnedWords || 0}
                    color="info"
                    icon={<List />}
                />
            </Grid>

            <Grid item xs={6} sm={6} md={6}>
                <SummarySection
                    sx={{ height: '100%' }}
                    title="Materials added"
                    total={data.totalStartedMaterials || 0}
                    color="warning"
                    icon={<Message />}
                />
            </Grid>

            <Grid item xs={6} sm={6} md={6}>
                <SummarySection
                    sx={{ height: '100%' }}
                    title="Materials learned"
                    total={data.totalStartedWords || 0}
                    color="error"
                    icon={<Book />}
                />
            </Grid>
        </Grid>
    );
};

export default StatsCard;
