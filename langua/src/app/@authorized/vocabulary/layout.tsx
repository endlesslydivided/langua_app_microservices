"use client"

import Header from '@/share/components/Layout/header';
import Nav from '@/share/components/Layout/nav';
import TabsMenu from '@/share/components/TabsMenu';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
 
export default  function AuthorizedLayout({
  all,
  mine
}: {
  all: React.ReactNode;
  mine:React.ReactNode
}) {

      
  const menuItems = ['All categories', 'My categories']
  const [active,setActive] = useState(0);
    
  return (
    <>
      <TabsMenu menuItems={menuItems} active={active} setActive={setActive}/>
      {
        active === 0 ? all : mine
      }
    </>
  );
}
