import SignInForm from '@/modules/auth/widgets/Forms/SignInForm';
import { Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';

import AuthLayout from './layout';

export const metadata: Metadata = {
    title: 'Langua | Auth',
};

export default function SignInPage() {
    return (
        <AuthLayout>
            <section className="w-3/4 mx-auto flex flex-col gap-10">
                <div className="title">
                    <Typography
                        variant="h3"
                        sx={{
                            py: '12px',
                            fontWeight: '700',
                        }}
                    >
                        Explore!
                    </Typography>
                    <Typography
                        sx={{
                            width: '75%',
                            mx: 'auto',
                            fontSize: '1.25rem',
                            lineHeight: '1.75rem',
                        }}
                    >
                        Get into your account or create a new one
                    </Typography>
                </div>

                <SignInForm />

                <Typography sx={{ textAlign: 'center' }}>
                    Don't have an account yet? &apos; &apos;
                    <Link href={'/signUp'} className="text-blue-700">
                        Sign Up
                    </Link>
                </Typography>
            </section>
        </AuthLayout>
    );
}
