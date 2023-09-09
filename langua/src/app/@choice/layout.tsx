'use client';

import { Container } from '@mui/material';

export default function VocabularyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Container
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100%',
                maxWidth: '100%',
                minWidth: '100%',
            }}
        >
            {children}
        </Container>
    );
}
