import { useSession } from 'next-auth/react'
import React from 'react'

interface BranchProvdierProps
{
  auth: React.ReactNode,
  authorized: React.ReactNode
}

const BranchProvdier:React.FC<BranchProvdierProps> = ({auth,authorized}) => 
{
  const { data: session, status } = useSession();

  return (
     !session ? authorized : auth
  )
}

export default BranchProvdier