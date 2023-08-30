"use client"

import Header from '@/share/components/Layout/header';
import Nav from '@/share/components/Layout/nav';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';


 // ----------------------------------------------------------------------
  
 const APP_BAR_MOBILE = 60;
 const APP_BAR_DESKTOP = 78;
 
 const StyledRoot = styled('div')({
     display: 'flex',
     minHeight: '100%',
     overflow: 'hidden',
 });
 
 const Main = styled('div')(({theme}) => ({
     flexGrow: 1,
     overflow: 'auto',
     minHeight: '100%',
     paddingTop: APP_BAR_MOBILE + 24,
     paddingBottom: theme.spacing(3),
     [theme.breakpoints.up('lg')]: {
         paddingTop: APP_BAR_DESKTOP,
         paddingLeft: theme.spacing(2),
         paddingRight: theme.spacing(2),
     },
 }));
 
 // ----------------------------------------------------------------------
 
export default  function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 
    const [open, setOpen] = useState(false);


    return (
        <StyledRoot>
            <Header onOpenNav={() => setOpen(true)}/>

            <Nav openNav={open} onCloseNav={() => setOpen(false)}/>

            <Main>
                {children}
            </Main>
        </StyledRoot>
    );
}
