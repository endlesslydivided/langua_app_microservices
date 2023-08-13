

import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import MainHeader from './components/MainHeader/MainHeader';

export const metadata = {
  title: 'Langua',
}

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <>
        {children}
    </>
  )
}