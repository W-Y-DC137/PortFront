// src/pages/AgentPages/TicketList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTicketsRequest } from '../../actions/ticketActions';
import { fetchUtilisateursRequest } from '../../actions/utilisateurActions';
import { fetchReferentielsRequest } from '../../actions/referentialActions';
import TruncatedText from '../../components/TruncatedText';
import Header from '../../components/Header';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Box, 
    TextField, 
    Checkbox, 
    FormControlLabel,
    CircularProgress,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';

const getUrgencyColor = (niveauUrgence) => {
    switch (niveauUrgence) {
        case 'ELEVE':
            return 'red';
        case 'MOYEN':
            return '#ffa500';
        case 'FAIBLE':
            return 'yellow';
        default:
            return 'gray'; // default color if no match
    }
};

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Formats date and time based on locale
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Nouveau':
            return '#A9A9A9'; // Gray
        case 'Affecte':
            return '#007BFF'; // Blue
        case 'En_Attente':
            return '#FFA500'; // Orange
        case 'Repondu':
            return '#800080'; // Purple
        case 'Resolu':
            return '#28A745'; // Green
        case 'Cloture':
            return 'black'; // Dark Red
        case 'Reouvert':
            return 'red';
        default:
            return 'gray'; // Default color if no match
    }
};

const TicketList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [ticketType, setTicketType] = useState('');
    const [showOnlyMyTickets, setShowOnlyMyTickets] = useState(false);

    const { tickets, loading, error } = useSelector(state => state.tickets);
    const { utilisateurs } = useSelector(state => state.utilisateurs);
    const { referentiels } = useSelector(state => state.referentiels);

    useEffect(() => {
        dispatch(fetchTicketsRequest());
        dispatch(fetchUtilisateursRequest());
        dispatch(fetchReferentielsRequest());
    }, [dispatch]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);  // Update search input state
    };

    const handleCheckboxChange = (event) => {
        setShowOnlyMyTickets(event.target.checked);
    };

    const getUtilisateurName = (id) => {
        const utilisateur = utilisateurs.find(u => u.id === id);
        return utilisateur ? utilisateur.nomUtilisateur : 'Non affecté';
    };

    const getReferentielLibelle = (id) => {
        const referentiel = referentiels.find(r => r.id === id);
        return referentiel ? referentiel.libelle : 'N/A';
    };

    const handleRowClick = (id) => {
        const userRole = localStorage.getItem('role');

        if (userRole === 'ADMIN') {
            navigate(`/client/tickets/${id}`);
        } else if (userRole === 'AGENT') {
            navigate(`/ticket/${id}`);
        } else {
            console.error('Unsupported user role:', userRole);
        }
    };

    const handleTicketTypeChange = (event) => {
        setTicketType(event.target.value);  // Update the ticket type state
    };
    // Récupérer le nom de l'agent connecté depuis le localStorage
    const agentName = localStorage.getItem('username') || '';

    const filteredTickets = tickets.filter(ticket => {
        const searchStr = searchTerm.toLowerCase();
        const matchesSearch = (
            ticket.idTicketDto.toString().includes(searchStr) ||
            ticket.typeTicketDto.toLowerCase().includes(searchStr) ||
            getReferentielLibelle(ticket.themeId).toLowerCase().includes(searchStr) ||
            getReferentielLibelle(ticket.sousThemeId).toLowerCase().includes(searchStr) ||
            ticket.niveauUrgenceDto.toLowerCase().includes(searchStr) ||
            ticket.objetDto.toLowerCase().includes(searchStr) ||
            ticket.descriptionDto.toLowerCase().includes(searchStr) ||
            getUtilisateurName(ticket.idClientDto).toLowerCase().includes(searchStr) ||
            getUtilisateurName(ticket.idAgentDto).toLowerCase().includes(searchStr) ||
            ticket.statusDto.toLowerCase().includes(searchStr)
        );

        const matchesAgent = showOnlyMyTickets 
            ? getUtilisateurName(ticket.idAgentDto).toLowerCase() === agentName.toLowerCase()
            : true;

            const matchesType = ticketType 
            ? ticket.typeTicketDto.toLowerCase() === ticketType.toLowerCase()
            : true;

        console.log(`Ticket ID: ${ticket.idTicketDto}, Agent ID: ${ticket.idAgentDto}, Matches Agent: ${matchesAgent}, Type: ${ticket.typeTicketDto}, Matches Type: ${matchesType}`);

        return matchesSearch && matchesAgent && matchesType;

    });

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
            <BreadcrumbsComponent/>
            <Box mb={2} mt={2} display="flex" flexDirection="column" gap={2}>
            <Grid container spacing={4} alignItems="center">
  {/* Champ de recherche */}
  <Grid item xs={12} md={8}>
    <TextField
      label="Chercher un ticket"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Rechercher par ID, Type, Urgence, etc..."
     
    />
  </Grid>

  {/* Case à cocher "Mes tickets" uniquement pour les agents */}
  {localStorage.getItem('role') === 'AGENT' && (
    <Grid item xs={6} md={1.5}>
      <FormControlLabel
        control={
          <Checkbox
            checked={showOnlyMyTickets}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label="Mes tickets"
      />
    </Grid>
  )}

  {/* Menu déroulant pour filtrer par type de ticket */}
  <Grid item xs={6} md={1.5}>
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Type de ticket</InputLabel>
      <Select
        value={ticketType}
        onChange={handleTicketTypeChange}
        label="Type de ticket"
      >
        <MenuItem value="">
          <em>Tous</em>
        </MenuItem>
        <MenuItem value="Reclamation">Réclamation</MenuItem>
        <MenuItem value="Demande">Demande</MenuItem>
      </Select>
    </FormControl>
  </Grid>
</Grid>
        
 </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell
                                style={{ width: 200, textAlign: 'center' }}
                            >Thème</TableCell>
                            <TableCell
                                style={{ width: 200, textAlign: 'center' }}
                            >Sous-Thème</TableCell>
                            <TableCell
                                style={{ width: 150, textAlign: 'center' }}
                            >Niveau d'Urgence</TableCell>
                            <TableCell
                                style={{ width: 90, textAlign: 'center' }}
                            >Statut</TableCell>
                            <TableCell
                                style={{ width: 90, textAlign: 'center' }}
                            >Nom de l'agent</TableCell>
                            <TableCell
                                style={{ width: 200, textAlign: 'center' }}
                            >Objet</TableCell>
                            <TableCell
                                style={{ width: 200, textAlign: 'center' }}
                            >Description</TableCell>
                            <TableCell
                                style={{ width: 150, textAlign: 'center' }}
                            >Date d'Ouverture</TableCell>
                            <TableCell
                                style={{ width: 90, textAlign: 'center' }}
                            >Nom du client</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTickets.length > 0 ? (
                            filteredTickets.map((ticket, index) => (
                                <TableRow
                                    key={ticket.idTicketDto}
                                    sx={{ 
                                        backgroundColor: index % 2 === 0 ? 'white' : '#f5f5f5',
                                        borderBottom: '4px solid #232f66'
                                    }}
                                    onClick={() => handleRowClick(ticket.idTicketDto)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell>{ticket.idTicketDto}</TableCell>
                                    <TableCell>{ticket.typeTicketDto}</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <TruncatedText text={getReferentielLibelle(ticket.themeId)} maxLength={60} />
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        {getReferentielLibelle(ticket.sousThemeId)}
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <Box 
                                            component="span" 
                                            sx={{
                                                display: 'inline-block',
                                                width: 10,
                                                height: 10,
                                                backgroundColor: getUrgencyColor(ticket.niveauUrgenceDto),
                                                marginRight: 1, // Space between the square and the text
                                                borderRadius: '2px', // Optionally round the square's edges
                                                border: '1px solid black'
                                            }}
                                        />
                                        {ticket.niveauUrgenceDto}
                                    </TableCell>

                                    <TableCell style={{ textAlign: 'center' }}>
                                        <Box 
                                            component="span" 
                                            sx={{
                                                display: 'inline-block',
                                                width: 10,
                                                height: 10,
                                                backgroundColor: getStatusColor(ticket.statusDto),
                                                marginRight: 1, // Space between the square and the text
                                                borderRadius: '2px', // Optional rounded edges
                                                border: '1px solid black' // Black border around the square
                                            }}
                                        />
                                        {ticket.statusDto}
                                    </TableCell>

                                    <TableCell style={{ textAlign: 'center' }}>
                                        {getUtilisateurName(ticket.idAgentDto)}
                                    </TableCell>

                                    <TableCell style={{ textAlign: 'center' }}>
                                        <TruncatedText text={ticket.objetDto} maxLength={60} />
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <TruncatedText text={ticket.descriptionDto} maxLength={100} />
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        {formatDateTime(ticket.dateOuvertureDto)}
                                    </TableCell>
                                    
                                    <TableCell style={{ textAlign: 'center' }}>
                                        {getUtilisateurName(ticket.idClientDto)}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={11} align="center">Aucun ticket disponible</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TicketList;
