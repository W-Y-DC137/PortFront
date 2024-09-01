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
                            >
                                Commencer la démarche
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

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
                            >
                                Accéder
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default PageClient;
