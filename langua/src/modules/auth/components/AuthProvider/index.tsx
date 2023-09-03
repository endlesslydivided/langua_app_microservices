'use client';

import { Vocabulary } from '@/modules/vocabularies/types/model';
import { createContext, useEffect, useState } from 'react';

import signOutFetch from '../../api/auth/signOut';
import findMe from '../../api/user/findMe';
import { User } from '../../types/user';

interface IAuthContext {
    auth: {
        isAuthenticated: boolean;
        user: User | null;
        loading: boolean;
        currentVocabulary: Vocabulary | null;
    };
    fetchUser: () => void;
    setCurrentVocabulary: (vocabulary: Vocabulary | null) => void;
    logOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
    auth: {
        isAuthenticated: false,
        user: null,
        currentVocabulary: null,
        loading: false,
    },
    fetchUser: () => {},
    setCurrentVocabulary: (vocabulary: Vocabulary | null) => {},
    logOut: () => {},
});

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        let vocabulary = window.localStorage.getItem('currentVocabulary');
        if (vocabulary) {
            let value = JSON.parse(vocabulary);
            data.setCurrentVocabulary(value);
        } else {
            data.setCurrentVocabulary(null);
        }
    }, []);

    const [data, setData] = useState<IAuthContext>({
        auth: {
            isAuthenticated: false,
            user: null,
            currentVocabulary: null,
            loading: true,
        },
        fetchUser: () => {
            setData((p) => ({ ...p, auth: { ...p.auth, loading: true } }));
            findMe()
                .then((result) => {
                    setData((p) => ({
                        ...p,
                        auth: {
                            ...p.auth,
                            user: result,
                            isAuthenticated: true,
                        },
                    }));
                })
                .finally(() =>
                    setData((p) => ({
                        ...p,
                        auth: { ...p.auth, loading: false },
                    })),
                );
        },
        setCurrentVocabulary: (vocabulary: Vocabulary | null) => {
            setData((p) => ({
                ...p,
                auth: { ...p.auth, currentVocabulary: vocabulary },
            }));
            localStorage.setItem(
                'currentVocabulary',
                JSON.stringify(vocabulary),
            );
        },
        logOut: () => {
            setData((p) => ({ ...p, auth: { ...p.auth, loading: true } }));
            signOutFetch()
                .then(() => {
                    setData((p) => ({
                        ...p,
                        auth: { ...p.auth, user: null, isAuthenticated: false },
                    }));
                })
                .finally(() =>
                    setData((p) => ({
                        ...p,
                        auth: { ...p.auth, loading: false },
                    })),
                );
        },
    });

    useEffect(() => {
        data.fetchUser();
    }, []);

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
