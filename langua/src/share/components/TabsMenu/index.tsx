'use client';

import {
    Box,
    Divider,
    SxProps,
    Theme,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';

interface TabsMenuProps {
    menuItems: string[];
    active: number;
    setActive: (item: number) => void;
    sx?: SxProps<Theme>;
}
const TabsMenu: React.FC<TabsMenuProps> = ({
    menuItems,
    active,
    setActive,
    sx,
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                ...sx,
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {menuItems.map((item: string, index: number) => (
                <>
                    <Box
                        key={item}
                        onClick={() => setActive(index)}
                        sx={{
                            display: 'flex',
                            cursor: 'pointer',
                            marginX: '5px',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                color:
                                    active === index
                                        ? theme.palette.text.primary
                                        : theme.palette.text.disabled,
                            }}
                        >
                            {item}
                        </Typography>
                    </Box>

                    {index === menuItems.length - 1 ? null : (
                        <Divider orientation="vertical" flexItem />
                    )}
                </>
            ))}
        </Box>
    );
};

export default TabsMenu;
