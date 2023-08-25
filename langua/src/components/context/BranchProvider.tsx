import useAuth from '@/share/hooks/useAuth';
import React from 'react';
import Loading from '../Loading/Loading';

interface BranchProvdierProps
{
  auth: React.ReactNode,
  authorized: React.ReactNode
}

const BranchProvdier:React.FC<BranchProvdierProps> = ({auth,authorized}) => 
{
  const {auth: user} = useAuth();

  return (
     user.loading ? <Loading/> : user.isAuthenticated ? authorized : auth 
  )
}

export default BranchProvdier