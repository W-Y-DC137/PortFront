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
        if (role === 'CLIENT') {
            navigate('/client');
        } else if (role === 'AGENT') {
            navigate('/agent');
        } else if (role === 'ADMIN') {
            navigate('/admin');
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                    <MenuIcon />
                </IconButton>
                
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Header
                </Typography>
                <Button edge="end"  color="inherit" aria-label="home" onClick={navigateToHome} style={{ marginLeft: 'auto' }} >
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
                        [
                            <MenuItem key="create-ticket" onClick={() => navigate('/client/create-ticket')}>Créer un ticket</MenuItem>,
                            <MenuItem key="follow-tickets" onClick={() => navigate('/client/tickets')}>Suivre mes tickets</MenuItem>
                        ]
                    )}
                    {role === 'AGENT' && (
                        <MenuItem key="agent-tickets" onClick={() => navigate('/agent/tickets')}>Liste des tickets</MenuItem>
                    )}
                    {role === 'ADMIN' && (
                        [
                            <MenuItem key="admin-tickets" onClick={() => navigate('/admin/tickets')}>Liste des tickets</MenuItem>,
                            <MenuItem key="admin-users" onClick={() => navigate('/admin/users')}>Liste des utilisateurs</MenuItem>
                        ]
                    )}
                    <MenuItem onClick={handleLogout}>Sortir</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
