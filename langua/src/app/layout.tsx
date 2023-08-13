
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import React from 'react';
import "./globals.css"
import 'rsuite/dist/rsuite.min.css';
import { options } from './api/auth/[...nextauth]/options';
import AuthProvider from './context/AuthProvider';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Langua',
}

export default async function RootLayout({
  auth,
  authorized
}: {
  auth: React.ReactNode,
  authorized: React.ReactNode
}) {


  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>      
          {  
            await getServerSession(options) ? authorized : auth       
          }
        </AuthProvider>
      </body>
    </html>
  )
}