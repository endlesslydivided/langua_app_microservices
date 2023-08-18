import { useSession } from 'next-auth/react'
import React, { Suspense } from 'react'
import Loading from '../loading';

interface BranchProvdierProps
{
  auth: React.ReactNode,
  authorized: React.ReactNode
}

const BranchProvdier:React.FC<BranchProvdierProps> = ({auth,authorized}) => 
{
  const { data: session, status } = useSession();

  return (
    status !== "loading" ? (session ? authorized : auth) :<Loading/> 
  )
}

export default BranchProvdier