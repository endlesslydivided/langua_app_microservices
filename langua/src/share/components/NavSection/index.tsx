import {Box, List, ListItemText} from '@mui/material';
import {StyledNavItem, StyledNavItemIcon} from './styles';
import {FC} from 'react';
import {LockOutlined} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import useAuth from '@/share/hooks/useAuth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
interface INavItemProps {
    item: any,
}



const NavSection = ({}) => {

    const router = useRouter();
    const {auth:user,logOut} = useAuth();
  
    const pages = [{
      key:  'Vocabulary',
      path: '/vocabulary',
      handleOnClick: () => {
        router.push('/vocabulary')
      },
      icon: <MenuBookIcon/>

    },
    {
      key:  'Materials',
      path: '/materials',
  
       handleOnClick: () => {
        router.push('/materials')
      },
      icon: <LibraryBooksIcon/>

    },
    {
      key:  'Stats',
      path: '/stats',
       handleOnClick: () => {
        router.push('/stats')
      },
      icon: <EmojiEventsIcon/>

    },
    ];
    
   
    return (
        <Box>
            <List disablePadding sx={{p: 1}}>

                {pages.map((item: any) =>
                        <NavItem key={item.key} item={item}/>)
                
                }

            </List>
        </Box>
    );
}

// ----------------------------------------------------------------------

const NavItem: FC<INavItemProps> = ({item}) => {
    const {path, key, handleOnClick,icon} = item;

    return (
        <StyledNavItem  onClick={handleOnClick}
            sx={{
                '&.active': {
                    color: 'text.primary',
                    bgcolor: 'action.selected',
                    fontWeight: 'fontWeightBold',
                },
            }}
        >
            <StyledNavItemIcon>{icon}</StyledNavItemIcon>

            <ListItemText disableTypography primary={key}/>
        </StyledNavItem>
    );
}

export default NavSection;
