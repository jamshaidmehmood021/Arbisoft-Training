import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Drawer, Typography } from '@material-ui/core';
import InstagramIcon from '@mui/icons-material/Instagram';
import { List, ListItem, ListItemIcon,ListItemText} from '@material-ui/core';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { AuthContext } from 'context/authContext';

const drawerWidth = 200;
const useStyles = makeStyles({
    page: {
        background: '#f9f9f9',
        width: '100%',
    },
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    icon: {
        marginRight: '10px',
        color: '#e7133b',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
    },
    title: {
        color: '#E4405F',
    },
    active: {
        background: '#f4f4f4',
    },
    list: {
        marginTop: '100px',
    },
    listItem: {
        marginBottom: '20px',
    },
});

const DrawerComponent = ({ children }) => {
    const customClasses = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);

    const menuItems = [
        {
            text: 'Home',
            icon: <HomeIcon sx={{ color: '#000000' }} />,
            path: '/home',
            showWhenLoggedIn: true,
        },
        {
            text: 'Login',
            icon: <LoginIcon sx={{ color: '#000000' }} />,
            path: '/',
            showWhenLoggedOut: true,
        },
        {
            text: 'Sign Up',
            icon: <HowToRegIcon sx={{ color: '#000000' }} />,
            path: '/signup',
            showWhenLoggedOut: true,
        },
        {
            text: 'Add Post',
            icon: <AddCircleOutlineIcon sx={{ color: '#000000' }} />,
            path: '/addPost',
            showWhenLoggedIn: true,
        },
        {
            text: 'Log Out',
            icon: <LogoutIcon sx={{ color: '#000000' }} />,
            onClick: logout,
            showWhenLoggedIn: true,
        },

    ];

    return (
        <div className={customClasses.root}>
            <Drawer
                className={customClasses.drawer}
                variant="permanent"
                classes={{ paper: customClasses.drawerPaper }}
                anchor="left"
            >
                <div className={customClasses.titleContainer}>
                    <InstagramIcon fontSize="large" className={customClasses.icon} />
                    <Typography variant="h5" className={customClasses.title}>
                        Instagram
                    </Typography>
                </div>

                <List className={customClasses.list}>
                    {menuItems
                        .filter(item => (item.showWhenLoggedOut && !user) || (item.showWhenLoggedIn && user)) 
                        .map(item => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => item.onClick ? item.onClick() : navigate(item.path)}
                                className={`${location.pathname === item.path ? customClasses.active : ''} ${customClasses.listItem}`}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                </List>
            </Drawer>

            <div className={customClasses.page}>
                {children}
            </div>
        </div>
    );
};

export default DrawerComponent;
