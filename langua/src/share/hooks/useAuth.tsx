import { AuthContext } from '@/app/context/AuthProvider';
import React, { useContext } from 'react'

const useAuth = () => {

    const {auth, fetchUser} = useContext(AuthContext);

    return {auth,fetchUser};
}

export default useAuth
