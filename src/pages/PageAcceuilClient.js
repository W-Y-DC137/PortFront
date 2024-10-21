<<<<<<< HEAD
import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import ClientHeader from '../components/Header';
=======
import React, { useState } from 'react';
import { 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    AppBar, 
    Toolbar, 
    IconButton, 
    Drawer, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Divider 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6
import { useNavigate } from 'react-router-dom';

const PageClient = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' && 
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{ width: 250 }}
        >
            <List>
                <ListItem button onClick={() => navigate('/client')}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Accueil" />
                </ListItem>
                <ListItem button onClick={() => navigate('/client/create-ticket')}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Soumettre une demande" />
                </ListItem>
                <ListItem button onClick={() => navigate('/client/tickets')}>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Suivre ma demande" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => navigate('/logout')}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Se déconnecter" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
<<<<<<< HEAD
            <ClientHeader />
            <Typography variant="h5" align="center" style={{ marginTop: '50px' }}>
                Bienvenue sur la plateforme PORTClaim. Cette plateforme vous permet de soumettre et de suivre vos demandes et réclamations de manière simple et efficace.
            </Typography>

            {/* Container to center the Grid vertically and horizontally */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="70vh" // Ensure the cards are centered vertically
            >
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={5}>
                        <Card
                            sx={{
                                width: '100%',  // Automatically adjust the width
                                height: '250px',
                                border: '2px solid #232f66', // Add border to the card
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for better appearance
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center', // Center content vertically
                                    alignItems: 'center', // Center content horizontally
                                    height: '100%',
                                }}
=======
            <AppBar position="static" style={{ backgroundColor: '#232f66' }}>
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        color="inherit" 
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        PORTClaim
                    </Typography>
                    <Button 
                        color="inherit" 
                        startIcon={<HomeIcon />} 
                        onClick={() => navigate('/client')}
                    >
                        Accueil
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerList}
            </Drawer>

            <Typography 
                variant="h5" 
                align="center" 
                style={{ 
                    marginTop: '20px', 
                    color: '#232f66', 
                }}
            >
                Bienvenue sur la plateforme PORTClaim.
                <br />
                Cette plateforme vous permet de soumettre et de suivre vos demandes et réclamations.
            </Typography>

            <Grid 
                container 
                spacing={4} 
                justifyContent="center" 
                alignItems="center" // Aligner verticalement les cartes au centre
                style={{ 
                    marginTop: '40px', 
                    padding: '0 20px', 
                    flexWrap: 'nowrap', // Empêche les cartes de passer à la ligne suivante
                }}
            >
                <Grid item xs={12} md={4}>
                    <Card 
                        style={{ 
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
                            borderRadius: '12px', 
                            backgroundColor: '#e6f2ff', 
                            padding: '40px',
                        }}
                    >
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography 
                                variant="h4" 
                                component="h2" 
                                style={{ color: '#232f66' }}
                            >
                                Soumettre une demande
                            </Typography>
                            <Typography 
                                variant="body1" 
                                color="textSecondary" 
                                style={{ marginTop: '15px' }}
                            >
                                Pour soumettre une nouvelle demande, cliquez sur le bouton ci-dessous.
                            </Typography>
                            <Button
                                variant="contained"
                                style={{ 
                                    marginTop: '25px', 
                                    backgroundColor: '#232f66', 
                                    color: '#ffffff',
                                    padding: '10px 20px',
                                    fontSize: '16px'
                                }}
                                onClick={() => navigate('/client/create-ticket')}
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6
                            >
                                <Typography variant="h4" component="h2" align="center">
                                    Soumettre une demande
                                </Typography>
                                <Typography variant="h6" color="textSecondary" align="center" style={{ marginTop: '10px' }}>
                                    Pour soumettre une nouvelle demande, cliquez sur le bouton ci-dessous.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: '20px', backgroundColor: '#232f66' }}
                                    onClick={() => navigate('/client/create-ticket')}
                                >
                                    Commencer la démarche
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

<<<<<<< HEAD
                    <Grid item xs={12} md={5}>
                        <Card
                            sx={{
                                width: '100%',
                                height: '250px',
                                border: '2px solid #232f66', // Add border to the card
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for better appearance
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center', // Center content vertically
                                    alignItems: 'center', // Center content horizontally
                                    height: '100%',
                                }}
=======
                <Grid item xs={12} md={4}>
                    <Card 
                        style={{ 
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
                            borderRadius: '12px', 
                            backgroundColor: '#e6f2ff', 
                            padding: '40px',
                        }}
                    >
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography 
                                variant="h4" 
                                component="h2" 
                                style={{ color: '#232f66' }}
                            >
                                Suivre ma demande
                            </Typography>
                            <Typography 
                                variant="body1" 
                                color="textSecondary" 
                                style={{ marginTop: '15px' }}
                            >
                                Pour suivre l'état d'avancement d'une précédente demande, cliquez sur le bouton ci-dessous.
                            </Typography>
                            <Button
                                variant="contained"
                                style={{ 
                                    marginTop: '25px', 
                                    backgroundColor: '#232f66', 
                                    color: '#ffffff',
                                    padding: '10px 20px',
                                    fontSize: '16px'
                                }}
                                onClick={() => navigate('/client/tickets')}
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6
                            >
                                <Typography variant="h4" component="h2" align="center">
                                    Suivre ma demande
                                </Typography>
                                <Typography variant="h6" color="textSecondary" align="center" style={{ marginTop: '10px' }}>
                                    Pour suivre l'état d'avancement d'une précédente demande, cliquez sur le bouton ci-dessous.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: '20px', backgroundColor: '#232f66' }}
                                    onClick={() => navigate('/client/tickets')}
                                >
                                    Accéder
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default PageClient;
