import useAuth from '@/share/hooks/useAuth';
import React from 'react';
import Loading from '../Loading/Loading';

interface BranchProvdierProps
{
  auth: React.ReactNode,
  authorized: React.ReactNode,
  finish: React.ReactNode,

}

const BranchProvdier:React.FC<BranchProvdierProps> = ({auth,authorized,finish}) => 
{
  const {auth: profile} = useAuth();


  if(profile.loading)
  {
    return <Loading/>
  }

  if(profile.isAuthenticated)
  {
    return profile.user?.nativeLanguage ? authorized : finish
  }

  return auth;
}

export default BranchProvdier