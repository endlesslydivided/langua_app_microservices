import FinishCard from '@/modules/auth/widgets/Cards/FinishCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Langua',
};

export default function FinishPage() {
    return <FinishCard />;
}
