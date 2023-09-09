import { AuthContext } from '@/modules/auth/components/AuthProvider';
import React, { useContext } from 'react';

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('Auth context is null');
    }

    return context;
};

export default useAuth;
