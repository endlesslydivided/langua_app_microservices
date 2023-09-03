'use client';

import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        router.replace('/');
    });

    return null;
}
