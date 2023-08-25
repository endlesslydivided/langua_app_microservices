import { AuthContext } from '@/components/context/AuthProvider';
import React, { useContext } from 'react'

const useTheme = () => {

    const context = useTheme(ThemeContext);

    if(!context)
    {
        throw Error('Auth context is null')
    }

    return context;
}

export default useAuth
