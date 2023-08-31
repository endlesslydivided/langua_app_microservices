"use client"

import Header from '@/share/components/Layout/header';
import Nav from '@/share/components/Layout/nav';
import TabsMenu from '@/share/components/TabsMenu';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
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
  myCategories
}: {
  children: React.ReactNode,
  myCategories: React.ReactNode,
}) {

    const pathname = usePathname();

    const menuItems = ['Vocabulary', 'My categories']
 
    const [open, setOpen] = useState(false);
    const [active,setActive] = useState(0);


    return (
        <StyledRoot>
            <Header onOpenNav={() => setOpen(true)}/>

            <Nav openNav={open} onCloseNav={() => setOpen(false)}/>

            <Main>
                {
                    pathname.match(/^\/(\w{0})$/g) ?
                    <TabsMenu sx={{
                        zIndex:'2',
                        position:'sticky',
                        top:0,
                        bottom:'100%'
                      }} menuItems={menuItems} active={active} setActive={setActive}/>
                    :
                    null
                }
                {
                    pathname.match(/^\/(\w{0})$/g) ?
                    active === 0 ? children : myCategories 
                    : 
                    children
                }
            </Main>
        </StyledRoot>
    );
}
