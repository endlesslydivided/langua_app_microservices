import bg from '@/assets/abstractBG/blackWhiteLines.gif';
import { Container, Typography } from '@mui/material';
import Image from 'next/image';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex h-screen ">
            <Container
                className="!p-0"
                sx={{
                    margin: 'auto',
                    width: '100%',
                    px: '0px',
                    minWidth: '100%',
                    maxWidth: '100%',
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: {
                        lg: 'repeat(2, minmax(0, 1fr))',
                    },
                }}
            >
                <div className="relative overflow-hidden flex flex-col justify-center">
                    <div className="text-center  absolute z-10 w-full ">
                        <Typography
                            variant="h1"
                            sx={{
                                paddingBottom: '10px',
                                fontSize: '96px',
                                lineHeight: '1',
                                fontWeight: '700',
                            }}
                        >
                            LANGUA
                        </Typography>
                        <Typography
                            sx={{
                                width: '75%',
                                mx: 'auto',
                                fontSize: '24px',
                                lineHeight: '32px',
                            }}
                            variant="body1"
                        >
                            Application to learn languages
                        </Typography>
                    </div>
                    <div className="filter brightness-50 h-full">
                        <Image
                            src={bg}
                            alt={''}
                            className="object-cover h-full w-full"
                        />
                    </div>
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">{children}</div>
                </div>
            </Container>
        </main>
    );
}
