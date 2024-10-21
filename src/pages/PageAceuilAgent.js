// src/pages/PageAgent.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketsRequest } from '../actions/ticketActions';
import { fetchUtilisateursRequest } from '../actions/utilisateurActions';
import Header from '../components/Header';
import BreadcrumbsComponent from '../components/BreadcrumbsComponent';
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';

const PageAgent = () => {
    const dispatch = useDispatch();

    // Récupérer les données des tickets et des utilisateurs depuis le store Redux
    const { tickets, loading, error } = useSelector(state => state.tickets);
    const { utilisateurs } = useSelector(state => state.utilisateurs);

    useEffect(() => {
        dispatch(fetchTicketsRequest());
        dispatch(fetchUtilisateursRequest());
    }, [dispatch]);

    // Récupérer l'ID de l'agent connecté depuis le localStorage
    const agentId = parseInt(localStorage.getItem('userId'), 10);
    const agentName = localStorage.getItem('nomUtilisateur') || '';

    // Calculer le nombre de tickets avec le statut "Nouveau"
    const nombreNouveau = tickets.filter(ticket => ticket.statusDto === 'Nouveau').length;

    // Définir les statuts à compter pour les tickets assignés à l'agent
    const statutsAgent = ['Affecte', 'Repondu', 'Resolu', 'Reouvert', 'Cloture'];

    // Filtrer les tickets assignés à l'agent avec les statuts spécifiés
    const ticketsAssignes = tickets.filter(ticket => 
        ticket.idAgentDto === agentId && statutsAgent.includes(ticket.statusDto)
    );

    // Calculer le nombre total de tickets assignés
    const nombreTicketsAgent = ticketsAssignes.length;

    // Calculer le nombre de tickets par statut assignés à l'agent
    const nombreParStatut = statutsAgent.reduce((acc, statut) => {
        acc[statut] = ticketsAssignes.filter(ticket => ticket.statusDto === statut).length;
        return acc;
    }, {});

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <Typography color="error">{error}</Typography>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <BreadcrumbsComponent />
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Tableau de Bord
                </Typography>
                <Grid container spacing={3}>
                    {/* Carte pour les tickets "Nouveau" */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ minWidth: 275, backgroundColor: '#f0f8ff' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <NewReleasesIcon fontSize="large" color="primary" />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h5" component="div">
                                            Tickets Nouveau
                                        </Typography>
                                        <Typography variant="h2" color="primary">
                                            {nombreNouveau}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Carte pour les tickets assignés à l'agent */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ minWidth: 275, backgroundColor: '#e6ffe6' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <AssignmentTurnedInIcon fontSize="large" color="secondary" />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h5" component="div">
                                            Mes Tickets Assignés
                                        </Typography>
                                        <Typography variant="h2" color="secondary">
                                            {nombreTicketsAgent}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Carte pour le statut "Affecte" */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ minWidth: 275, backgroundColor: '#fff0f5' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <AssignmentIcon fontSize="large" color="action" />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h5" component="div">
                                            Affecté
                                        </Typography>
                                        <Typography variant="h2" color="action">
                                            {nombreParStatut['Affecte'] || 0}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Carte pour le statut "Repondu" */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ minWidth: 275, backgroundColor: '#a9e5fc9e' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                    <AssignmentIcon fontSize="large" color="info" />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h5" component="div">
                                            Repondu
                                        </Typography>
                                        <Typography variant="h2" color="success">
                                            {nombreParStatut['Repondu'] || 0}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Carte pour le statut "Resolu" */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ minWidth: 275, backgroundColor: '#f5f5dc' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        
                                        <CheckCircleIcon fontSize="large" color="success" />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h5" component="div">
                                            Résolu
                                        </Typography>
                                        <Typography variant="h2" color="info">
                                            {nombreParStatut['Resolu'] || 0}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Carte pour le statut "Réouvert" */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ minWidth: 275, backgroundColor: '#fffacd' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <ReplayIcon fontSize="large" color="warning" />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h5" component="div">
                                            Réouvert
                                        </Typography>
                                        <Typography variant="h2" color="warning">
                                            {nombreParStatut['Reouvert'] || 0}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Carte pour le statut "Cloturé" */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ minWidth: 275, backgroundColor: '#ffe4e1' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <CloseIcon fontSize="large" color="error" />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h5" component="div">
                                            Cloturé
                                        </Typography>
                                        <Typography variant="h2" color="error">
                                            {nombreParStatut['Cloture'] || 0}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default PageAgent;
