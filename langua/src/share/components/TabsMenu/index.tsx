'use client'
import { Box, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';


interface TabsMenuProps
{
    menuItems: string[];
    active: number;
    setActive: (item:number) => void
}
const TabsMenu:React.FC<TabsMenuProps> = ({menuItems,active,setActive}) => {

    const theme = useTheme();

    return (
        <Box sx={{
            display:'flex',
            flexDirection:'row',
        }}>
            {
                menuItems.map((item:string,index:number) =>
                <>
                <Box
                onClick={() => setActive(index)}            
                sx={{
                        display:'flex',
                        cursor:'pointer',
                        marginX:'5px'
                    }}>
                        <Typography variant='h4' sx={{
                           color: active === index ? theme.palette.text.primary : theme.palette.text.disabled
                        }}>{item}</Typography>
                </Box>
                
                {index === menuItems.length - 1 ? null : <Divider orientation="vertical" flexItem/>}
                </>
                    
                )
            }
        </Box>
    )
}

export default TabsMenu