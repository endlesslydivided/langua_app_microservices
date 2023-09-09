import useAuth from '@/share/hooks/useAuth';
import React from 'react';

import Loading from '../Loading';

interface BranchProviderProps {
    auth: React.ReactNode;
    authorized: React.ReactNode;
    finish: React.ReactNode;
    choice: React.ReactNode;
}

const BranchProvider: React.FC<BranchProviderProps> = ({
    auth,
    authorized,
    finish,
    choice,
}) => {
    const { auth: profile } = useAuth();

    if (profile.loading) {
        return <Loading />;
    }

    if (profile.isAuthenticated) {
        if (profile.user?.nativeLanguage) {
            return profile.currentVocabulary ? authorized : choice;
        }

        return finish;
    }

    return auth;
};

export default BranchProvider;
