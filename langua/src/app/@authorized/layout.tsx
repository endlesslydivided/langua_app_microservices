"use client"
import useAuth from '@/share/hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Tab, Tabs, Toolbar, Tooltip, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useContext, useState } from 'react';


export default  function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const {logOut} = useAuth();

  const pages = [{
    key:  'Vocabulary',
    path: '/vocabulary',
    handleOnClick: () => {
      router.push('/vocabulary')
    }
  },
  {
    key:  'Materials',
    path: '/materials',

     handleOnClick: () => {
      router.push('/materials')
    }
  },
  {
    key:  'Stats',
    path: '/stats',
     handleOnClick: () => {
      router.push('/stats')
    }
  },
  ];
  
  const sidePage = [{
    key:  'Profile',
    handleOnClick: () => {},
    icon: <PersonIcon/>
  },
  {
    key:  'Logout',
    handleOnClick: () => { 
      logOut();
    },
    icon: <LogoutIcon/>
  },
  ];

  const [currentPage,setCurrentPage] = useState(pages.findIndex((i) => i.path === window.location.pathname));


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => router.push('/')}
            sx={{
              mr: 2,
              cursor:"pointer",
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Langua
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.key} onClick={() => page.handleOnClick()}>
                  <Typography textAlign="center">{page.key}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LANGUA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'center' }}>
          <Tabs value={currentPage} textColor="secondary"
           sx={{'& .MuiTabs-indicator': {backgroundColor: (theme) => theme.palette.secondary.main,}}}>    
              {pages.map((page,index) => (
                <Tab
                label={page.key}
                onClick={page.handleOnClick} 
                id={index.toString()}/>
              ))}
            </Tabs>
          </Box>


          <Box sx={{ flexGrow: 0,display: { xs: 'none', md: 'flex' }, justifyContent:'center' }}>

          {sidePage.map((page) => (
              <IconButton
                key={page.key}
                onClick={() => page.handleOnClick()}
              >
                {page.icon}
              </IconButton>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0,display: { xs: 'flex', md: 'none' }, }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon/>
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {sidePage.map((page) => (
                <MenuItem key={page.key} onClick={() => page.handleOnClick()}>
                  <Typography textAlign="center">{page.key}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>

        </Container>
      </AppBar>
      {children}
    </>
  );
}
