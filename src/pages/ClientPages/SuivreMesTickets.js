import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTicketsByClientRequest } from '../../actions/ticketActions';
import { fetchUtilisateursRequest } from '../../actions/utilisateurActions';
import { fetchReferentielsRequest } from '../../actions/referentialActions';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';

const TicketList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    
    const { tickets, loading: ticketsLoading, error: ticketsError } = useSelector(state => state.tickets);
    const { utilisateurs, loading: utilisateursLoading, error: utilisateursError } = useSelector(state => state.utilisateurs);
    const { referentiels, loading: referentielsLoading, error: referentielsError } = useSelector(state => state.referentiels);

    useEffect(() => {
        dispatch(fetchUtilisateursRequest());
        dispatch(fetchReferentielsRequest());

        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(fetchTicketsByClientRequest(userId));
        }
    }, [dispatch]);

    const getUtilisateurName = (userId) => {
        const utilisateur = utilisateurs.find(u => u.id === userId);
        return utilisateur ? utilisateur.nomUtilisateur : 'N/A';
    };

    const getReferentielLibelle = (id) => {
        const referentiel = referentiels.find(r => r.id === id);
        return referentiel ? referentiel.libelle : 'N/A';
    };

    const handleRowClick = (id) => {
        navigate(`/client/tickets/${id}`);
    };

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

    if (ticketsLoading || utilisateursLoading || referentielsLoading) {
        return <p>Loading...</p>;
    }

    if (ticketsError || utilisateursError || referentielsError) {
        return <p>Error: {ticketsError || utilisateursError || referentielsError}</p>;
    }

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
                Liste des Tickets
            </Typography>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticket ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Theme</TableCell>
                            <TableCell>SousTheme</TableCell>
                            <TableCell>Niveau d'Urgence</TableCell>
                            <TableCell>Objet</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date d'Ouverture</TableCell>
                            <TableCell>Nom du Client</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Nom d'Agent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.length > 0 ? (
                            tickets.map((ticket, index) => (
                                <TableRow
                                    key={ticket.idTicketDto}
                                    sx={{ backgroundColor: index % 2 === 0 ? 'white' : '#f5f5f5' }}
                                    onClick={() => handleRowClick(ticket.idTicketDto)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell>{ticket.idTicketDto}</TableCell>
                                    <TableCell>{ticket.typeTicketDto}</TableCell>
                                    <TableCell>{getReferentielLibelle(ticket.themeId)}</TableCell>
                                    <TableCell>{getReferentielLibelle(ticket.sousThemeId)}</TableCell>
                                    <TableCell>{ticket.niveauUrgenceDto}</TableCell>
                                    <TableCell>{ticket.objetDto}</TableCell>
                                    <TableCell>{ticket.descriptionDto}</TableCell>
                                    <TableCell>{ticket.dateOuvertureDto}</TableCell>
                                    <TableCell>{getUtilisateurName(ticket.idClientDto)}</TableCell>
                                    <TableCell>{ticket.statusDto}</TableCell>
                                    <TableCell>{getUtilisateurName(ticket.idAgentDto)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={11}>No tickets available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TicketList;
