//@ts-nocheck
import {useEffect, useState} from 'react';
import {alpha} from '@mui/material/styles';
import {Avatar, Box, Divider, IconButton, ListItemIcon, MenuItem, Popover, Stack, Typography} from '@mui/material';
import {useAppSelector} from '../../../hooks/redux';
import {useLogoutMutation} from '../../../services/AuthApiSlice';
import {toast} from 'react-toastify';
import {ExitToApp, Person} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const MENU_OPTIONS = [
    {label: 'Profile', icon: <Person fontSize="small"/>},
];


export default function AccountPopover() {
    const [open, setOpen] = useState(null);
    const user: any = useAppSelector(state => state.auth.user);
    const navigate = useNavigate();
    const handleOpen = (event: any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = (event: any) => {
        setOpen(null);
    };


    const handleProfile = () => {
        setOpen(null);
        navigate(`/user/users/${user.id}`);
    };

    const [logOut, {isLoading, isSuccess, isError, error}] = useLogoutMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
        }

        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) => toast.error(el.message, {position: 'top-right',}));
            } else {
                toast.error((error as any).data.message, {position: 'top-right',});
            }
        }
    }, [isLoading]);

    const onLogoutHandler = () => {
        logOut();
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    p: 0, ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <Avatar src={user?.photo?.path && process.env.REACT_APP_API_URL + user?.photo?.path}
                        alt={user?.photo?.path && process.env.REACT_APP_API_URL + user?.photo?.path}/>
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
                        {`${user.firstName} ${user.lastName}`}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}} nowrap>
                        {user.email}
                    </Typography>
                </Box>

                <Divider sx={{borderStyle: 'dashed'}}/>

                <Stack sx={{p: 1}}>
                    <MenuItem key={'Профиль'} onClick={handleProfile}>
                        <ListItemIcon>
                            <Person fontSize="small"/>
                        </ListItemIcon>
                        Профиль
                    </MenuItem>
                </Stack>

                <Divider sx={{borderStyle: 'dashed'}}/>

                <MenuItem onClick={onLogoutHandler} sx={{m: 1}}>
                    <ListItemIcon>
                        <ExitToApp fontSize="small"/>
                    </ListItemIcon>
                    Выйти из аккаунта
                </MenuItem>
            </Popover>
        </>
    );
}
