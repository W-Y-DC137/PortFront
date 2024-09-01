import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); // Get the role from local storage

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    // Function to navigate to the user's home page based on their role
    const navigateToHome = () => {
        switch (role) {
            case 'CLIENT':
                navigate('/client');
                break;
            case 'AGENT':
                navigate('/agent');
                break;
            case 'ADMIN':
                navigate('/admin');
                break;
            default:
                navigate('/login');
        }
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#232f66' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    PORTClaim
                </Typography>
                <Button color="inherit" onClick={navigateToHome}>
                    Home
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => navigate('/employee/profile')}>Profile</MenuItem>
                    {role === 'CLIENT' && (
                        <>
                            <MenuItem onClick={() => navigate('/client/create-ticket')}>Créer un ticket</MenuItem>
                            <MenuItem onClick={() => navigate('/client/tickets')}>Suivre mes tickets</MenuItem>
                        </>
                    )}
                    {role === 'AGENT' && (
                        <MenuItem onClick={() => navigate('/agent/tickets')}>Liste des tickets</MenuItem>
                    )}
                    {role === 'ADMIN' && (
                        <>
                            <MenuItem onClick={() => navigate('/admin/tickets')}>Liste des tickets</MenuItem>
                            <MenuItem onClick={() => navigate('/admin/users')}>Liste des utilisateurs</MenuItem>
                        </>
                    )}
                    <MenuItem onClick={handleLogout}>Sortir</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
