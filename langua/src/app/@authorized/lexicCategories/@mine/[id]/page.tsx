import MineWordsListCard from '@/modules/words/widgets/Cards/MineWordsListCard';
import { Metadata } from 'next';
import { useEffect } from 'react';

export const metadata: Metadata = {
    title: 'Langua | Words',
};

export interface MineWordsPageProps {
    params: {
        id: string;
    };
}
export default function MineWordsPage(route: MineWordsPageProps) {
    return <MineWordsListCard lexicCategoryId={route.params.id} />;
}
