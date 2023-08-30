"use client"

import TabsMenu from '@/share/components/TabsMenu';
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
      <TabsMenu sx={{
        zIndex:'2',
        position:'sticky',
        top:0,
        bottom:'100%'
      }} menuItems={menuItems} active={active} setActive={setActive}/>
      {
        active === 0 ? all : mine
      }
    </>
  );
}
