import useAuth from '@/share/hooks/useAuth';
import { ExitToApp, Person } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItemIcon, MenuItem, Popover, Stack, Theme, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { identicon } from '@/share/utils/createIdenticon';


export default function AccountPopover() {

    const [open, setOpen] = useState(null);
    const {auth:user,logOut} = useAuth();
    const router = useRouter();
    const handleOpen = (event: any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = (event: any) => {
        setOpen(null);
    };


    const handleProfile = () => {
        setOpen(null);
        router.push('/profile')
    };

    const onLogoutHandler = () => {
        logOut();
    };

    const iconButtonSx = open ? {
        '&:before': {
            zIndex: 1,
            content: "''",
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            position: 'absolute',
            bgcolor: (theme:Theme) => alpha(theme.palette.grey[900], 0.8),
        },
    }: {}

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{p: 0, ...iconButtonSx}}
            >
                <Avatar src={identicon(user.user?.userContacts?.email)}alt="photoURL"/>
            </IconButton>

            <Popover open={Boolean(open)} anchorEl={open} onClose={handleClose}
                     anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                     transformOrigin={{vertical: 'top', horizontal: 'right'}}
                     PaperProps={{
                         sx: {
                             p: 0,
                             mt: 1.5,
                             ml: 0.75,
                             '& .MuiMenuItem-root': {typography: 'body2', borderRadius: 0.75}
                         }
                     }}
            >
                <Box sx={{my: 1.5, px: 2.5}}>
                    <Typography variant="subtitle2" noWrap>
                        {`${user.user?.firstname} ${user.user?.surname}`}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                        {user.user?.userContacts.email}
                    </Typography>
                </Box>

                <Divider sx={{borderStyle: 'dashed'}}/>

                <Stack sx={{p: 1}}>
                    <MenuItem key={'Профиль'} onClick={handleProfile}>
                        <ListItemIcon>
                            <Person fontSize="small"/>
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                </Stack>

                <Divider sx={{borderStyle: 'dashed'}}/>

                <MenuItem onClick={onLogoutHandler} sx={{m: 1}}>
                    <ListItemIcon>
                        <ExitToApp fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}
