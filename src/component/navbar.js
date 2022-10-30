import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//imports of firebase
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

//imports of MUI
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar({ onClickAction }) {
  const navigate = useNavigate();
  const dashboard = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState('');
  const email = localStorage.getItem('email');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getUserData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('email', '==', email))
    );
    querySnapshot.forEach((doc) => {
      setUserData(doc.data());
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  console.log(userData);

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/home'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
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
                {dashboard.pathname === '/home/dashboard' ? (
                  <MenuItem onClick={() => navigate('/home')}>
                    <Typography textAlign='center'>Go To Home</Typography>
                  </MenuItem>
                ) : dashboard.pathname === '/home/profile' ? (
                  <MenuItem onClick={() => navigate('/home')}>
                    <Typography textAlign='center'>Go To Home</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={onClickAction}>
                    <Typography textAlign='center'>ADD PRODUCT</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
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
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {dashboard.pathname === '/home/dashboard' ? (
                <Button
                  onClick={() => navigate('/home')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Go To Home
                </Button>
              ) : dashboard.pathname === '/home/profile' ? (
                <Button
                  onClick={() => navigate('/home')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Go To Home
                </Button>
              ) : (
                <Button
                  onClick={onClickAction}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  ADD PRODUCT
                </Button>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={userData?.profileImageUrl} />
                  <Typography
                    sx={{
                      marginLeft: '12px',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '18px',
                    }}
                  >
                    {userData?.userName}
                  </Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
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
                {dashboard.pathname === '/home/profile' ? (
                  <MenuItem onClick={() => navigate('/home/dashboard')}>
                    <Typography textAlign='center'>Dashboard</Typography>
                  </MenuItem>
                ) : dashboard.pathname === '/home/dashboard' ? (
                  <MenuItem onClick={() => navigate('/home/profile')}>
                    <Typography textAlign='center'>Profile</Typography>
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem onClick={() => navigate('/home/dashboard')}>
                      <Typography textAlign='center'>Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/home/profile')}>
                      <Typography textAlign='center'>Profile</Typography>
                    </MenuItem>
                  </>
                )}
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem('uid');
                    localStorage.removeItem('email');
                    localStorage.removeItem('user');
                    navigate('/');
                  }}
                >
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default NavBar;
