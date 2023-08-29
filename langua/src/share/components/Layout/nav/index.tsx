'use client'

import { Box, Drawer, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { FC, useEffect } from 'react';
import useAuth from '@/share/hooks/useAuth';
import NavSection from '../../NavSection';
import Scrollbar from '../../Scrollbar';
import useResponsive from '@/share/hooks/useResponsive';


const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

interface INavProps {
    openNav: boolean,
    onCloseNav: () => void,
}

const Nav: FC<INavProps> = ({openNav, onCloseNav}) => {

    const {auth: user} = useAuth()
    const isDesktop = useResponsive({query:'up', start:'lg'});

    const pathname = window.location;

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
    }, [pathname]);

    const renderContent = (
        <Scrollbar sx={{height: 1, '& .simplebar-content': {height: 1, display: 'flex', flexDirection: 'column'}}}>
            <Box 
                 sx={{cursor: 'pointer', px: 2.5, py: 1.5, display: 'inline-flex', justifyContent: 'center'}}>
             {/* <Image  style={{maxWidth: '50%'}}/> */}
            </Box>


            <Box sx={{cursor: 'pointer', mb: 2.5, mx: 2.5}} onClick={() => {}}>

                <StyledAccount>

                    {/* <Avatar src={user?.photo?.path && process.env.REACT_APP_API_URL + user?.photo?.path}
                            alt="photoURL"/> */}


                    <Box sx={{ml: 2}}>
                        <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
                            {`${user.user?.firstname} ${user.user?.surname}`}
                        </Typography>


                    </Box>
                </StyledAccount>
            </Box>

            <NavSection/>

        </Scrollbar>
    );

    return (
        <Box component="nav" sx={{flexShrink: {lg: 0}, width: {lg: NAV_WIDTH}}}>
            {isDesktop ? (
                    <Drawer open variant="permanent" PaperProps={{
                        sx: {
                            width: NAV_WIDTH,
                            bgcolor: 'background.default',
                            borderRightStyle: 'dashed'
                        }
                    }}>
                        {renderContent}
                    </Drawer>
                ) :
                (
                    <Drawer open={openNav} onClose={onCloseNav} ModalProps={{keepMounted: true,}}
                            PaperProps={{sx: {width: NAV_WIDTH},}}>
                        {renderContent}
                    </Drawer>
                )}
        </Box>
    );
}

export default Nav;