import StatsCard from '@/modules/stats/widgets/Cards/StatsCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Langua | Stats',
};

export interface StatsPageProps {}

export default function StatsPage(props: StatsPageProps) {
    return <StatsCard />;
}
