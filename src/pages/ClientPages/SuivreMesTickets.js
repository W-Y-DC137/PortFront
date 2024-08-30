import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTicketsByClientRequest } from '../../actions/ticketActions';
import { fetchUtilisateursRequest } from '../../actions/utilisateurActions';
import { fetchReferentielsRequest } from '../../actions/referentialActions';
import Header from '../../components/Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TicketList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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

    if (ticketsLoading || utilisateursLoading || referentielsLoading) {
        return <p>Loading...</p>;
    }

    if (ticketsError || utilisateursError || referentielsError) {
        return <p>Error: {ticketsError || utilisateursError || referentielsError}</p>;
    }

    return (
        <div>
            <Header />
            <h1>Ticket List</h1>
            <TableContainer component={Paper}>
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
