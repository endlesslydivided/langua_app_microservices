"use client"

import TabsMenu from '@/share/components/TabsMenu';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { IconButton } from '@mui/material';
export default  function AuthorizedLayout({
  all,
  mine
}: {
  all: React.ReactNode;
  mine:React.ReactNode
}) {

  const router = useRouter();
  const pathname = usePathname();

  const menuItems = ['All categories', 'My categories']
  const [active,setActive] = useState(0);
  return (
    <>
      {
        pathname.match(/^\/lexicCategories\/(\w*)$/g) ?

        <IconButton onClick={() => router.back()}>
          <ArrowBackOutlinedIcon/>
        </IconButton>
        :

        <TabsMenu sx={{
          zIndex:'2',
          position:'sticky',
          top:0,
          bottom:'100%'
        }} menuItems={menuItems} active={active} setActive={setActive}/>
      }
      {
          active === 0 ? all : mine
      }
      
    </>
  );
}
