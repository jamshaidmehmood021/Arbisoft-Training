'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { AuthContext } from '@/app/context/authContext';
import useAuth from '@/app/hook/useAuth';

const pages = ['Sign In', 'Sign Up'];
const settings = ['Profile', 'Dashboard', 'Logout'];

const Navbar = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not available");
  }  
  const { user, role, userID, setUserRole, profilePicture, setProfilePicture, logout } = authContext || {};

  const router = useRouter();
  const { apiCall } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const fetchUserData = useCallback(async () => {
    if (userID) {
      try {
        const response = await apiCall(`http://localhost:5000/user/${userID}`, undefined, 'GET');
        if (response?.data) {
          setProfilePicture(response.data.profilePicture);
          setUserRole(response.data.role);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }
  }, [userID, apiCall, setProfilePicture, setUserRole]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleOpenNavMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const pagesNavigation = useCallback((page: string) => {
    switch (page) {
      case 'Sign Up':
        router.push('/signUp');
        break;
      case 'Sign In':
        router.push('/signIn');
        break;
      case 'Profile':
        router.push(`/profile/${userID}`);
        break;
      case 'Dashboard':
        router.push('/dashboard');
        break;
      case 'Logout':
        logout();
        break;
      default:
        break;
    }
    setAnchorElNav(null);
  }, [router, userID, logout]);

  const handleCreateGig = () => {
    router.push('/gigs');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Fiver Lite
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
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
              onClose={() => pagesNavigation('')}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => pagesNavigation(page)}>
                  <Typography sx={{ textAlign: 'center', color: 'black', fontFamily: 'monospace' }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Fiver Lite
          </Typography>

          {!user && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => pagesNavigation(page)}
                  sx={{ my: 2, color: 'black', display: 'block', marginLeft: '70px' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}

          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              {role === 'Seller' && (
                <Button
                  onClick={handleCreateGig}
                  sx={{ my: 2, color: 'black', marginRight: '20px', backgroundColor: '#004225', color: 'white' }}
                >
                  Create Gig
                </Button>
              )}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Profile Picture" src={profilePicture as string} />
                </IconButton>
              </Tooltip>
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => pagesNavigation(setting)}>
                    <Typography sx={{ textAlign: 'center', color: 'black' }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
