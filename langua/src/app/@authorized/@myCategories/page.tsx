import MineLexicCategoriesCard from '@/modules/lexicCategories/widgets/Cards/MineLexicCategoriesCard';
import VocabularyWordsListCard from '@/modules/words/widgets/Cards/VocabularyWordsListCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Langua | Categories',
};

export interface VocabularyPageProps {}

export default function VocabularyPage(props: VocabularyPageProps) {
    return <MineLexicCategoriesCard />;
}
