import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import AdminHeader from '../components/Header';
import { useNavigate } from 'react-router-dom';

const PageAdmin = () => {
    const navigate = useNavigate();

    return (
        <div>
            <AdminHeader />
            <Typography variant="h5" align="center" style={{ marginTop: '50px' }}>
                Bienvenue sur la plateforme d'administration de PORTClaim. Cette plateforme vous permet de gérer les utilisateurs de manière simple et efficace.
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
                            >
                                <Typography variant="h4" component="h2" align="center">
                                    Ajouter un utilisateur
                                </Typography>
                                <Typography variant="h6" color="textSecondary" align="center" style={{ marginTop: '10px' }}>
                                    Pour ajouter un nouvel utilisateur, cliquez sur le bouton ci-dessous.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: '20px', backgroundColor: '#232f66' }}
                                    onClick={() => navigate('/users/Adding')}
                                >
                                    Ajouter utilisateur
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

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
                            >
                                <Typography variant="h4" component="h2" align="center">
                                    Liste des utilisateurs
                                </Typography>
                                <Typography variant="h6" color="textSecondary" align="center" style={{ marginTop: '10px' }}>
                                    Pour consulter et gérer les utilisateurs, cliquez sur le bouton ci-dessous.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: '20px', backgroundColor: '#232f66' }}
                                    onClick={() => navigate('/admin/users')}
                                >
                                    Liste des utilisateurs
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default PageAdmin;
