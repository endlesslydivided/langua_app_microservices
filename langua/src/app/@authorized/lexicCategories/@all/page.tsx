import AllLexicCategoriesCard from '@/modules/lexicCategories/widgets/Cards/AllLexicCategoriesCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Langua | Categories',
};

export interface AllCategoriesPageProps {}

export default function AllCategoriesPage(props: AllCategoriesPageProps) {
    return <AllLexicCategoriesCard />;
}
