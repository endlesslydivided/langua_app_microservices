import useAuth from '@/share/hooks/useAuth';
import { LockOutlined } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, List, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { StyledNavItem, StyledNavItemIcon } from './styles';

interface INavItemProps {
    item: any;
}

const NavSection = ({}) => {
    const router = useRouter();
    const { auth: user, logOut } = useAuth();

    const pages = [
        {
            key: 'Vocabulary',
            path: '/lexicCategories',
            handleOnClick: () => {
                router.push('/lexicCategories');
            },
            icon: <MenuBookIcon />,
            disabled: false,
        },
        {
            key: 'Materials',
            path: '/materials',

            handleOnClick: () => {
                router.push('/materials');
            },
            icon: <LibraryBooksIcon />,
            disabled: true,
        },
        {
            key: 'Stats',
            path: '/stats',
            handleOnClick: () => {
                router.push('/stats');
            },
            icon: <EmojiEventsIcon />,
            disabled: false,
        },
    ];

    return (
        <Box>
            <List disablePadding sx={{ p: 1 }}>
                {pages.map((item) => (
                    <NavItem key={item.key} item={item} />
                ))}
            </List>
        </Box>
    );
};

// ----------------------------------------------------------------------

const NavItem: FC<INavItemProps> = ({ item }) => {
    const { path, key, handleOnClick, icon, disabled } = item;

    return (
        <StyledNavItem
            disabled={disabled}
            onClick={handleOnClick}
            sx={{
                '&.active': {
                    color: 'text.primary',
                    bgcolor: 'action.selected',
                    fontWeight: 'fontWeightBold',
                },
            }}
        >
            <StyledNavItemIcon>{icon}</StyledNavItemIcon>

            <ListItemText disableTypography primary={key} />
        </StyledNavItem>
    );
};

export default NavSection;
