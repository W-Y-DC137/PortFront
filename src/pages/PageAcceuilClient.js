import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import ClientHeader from '../components/Header';
import { useNavigate } from 'react-router-dom';

const PageClient = () => {
    const navigate = useNavigate();

    return (
        <div>
            <ClientHeader />
            <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
                Bienvenue sur la plateforme PORTClaim. Cette plateforme vous permet de soumettre et de suivre vos demandes et réclamations de manière simple et efficace.
            </Typography>

            <Grid container spacing={4} justifyContent="center" style={{ marginTop: '40px' }}>
                <Grid item xs={12} md={5}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Soumettre une demande
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                                Pour soumettre une nouvelle demande, cliquez sur le bouton ci-dessous.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '20px' }}
                                onClick={() => navigate('/client/create-ticket')}
                            >
                                Commencer la démarche
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Suivre ma demande
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                                Pour suivre l'état d'avancement d'une précédente demande, cliquez sur le bouton ci-dessous.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '20px' }}
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
