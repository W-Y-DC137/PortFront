import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTicketsByClientRequest } from '../../actions/ticketActions';
import { fetchUtilisateursRequest } from '../../actions/utilisateurActions';
import { fetchReferentielsRequest } from '../../actions/referentialActions';
<<<<<<< HEAD
import TruncatedText from '../../components/TruncatedText';
import Header from '../../components/Header';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box ,TextField ,Checkbox, 
    FormControlLabel,
    CircularProgress,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid} from '@mui/material';

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
            return '#8B0000'; // Dark Red
        default:
            return 'gray'; // Default color if no match
    }
};
=======
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6

const TicketList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
<<<<<<< HEAD

    const [searchTerm, setSearchTerm] = useState('');
    const [ticketType, setTicketType] = useState('');
=======
    const [drawerOpen, setDrawerOpen] = React.useState(false);
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6
    
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);  // Update search input state
    };

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

<<<<<<< HEAD
    const handleTicketTypeChange = (event) => {
        setTicketType(event.target.value);  // Update the ticket type state
    };

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

        

            const matchesType = ticketType 
            ? ticket.typeTicketDto.toLowerCase() === ticketType.toLowerCase()
            : true;

        console.log(`Ticket ID: ${ticket.idTicketDto}, Type: ${ticket.typeTicketDto}, Matches Type: ${matchesType}`);

        return matchesSearch &&  matchesType;
    });
=======
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
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6

    if (ticketsLoading || utilisateursLoading || referentielsLoading) {
        return <p>Loading...</p>;
    }

    if (ticketsError || utilisateursError || referentielsError) {
        return <p>Error: {ticketsError || utilisateursError || referentielsError}</p>;
    }

    return (
        <div>
<<<<<<< HEAD
            <Header />
            <BreadcrumbsComponent />
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
                Liste des Tickets
            </Typography>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Theme</TableCell>
                            <TableCell>SousTheme</TableCell>
                            <TableCell
                            style={{ width: 150 , justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center' }}
                            >Niveau d'Urgence</TableCell>
                             <TableCell
                            style={{width: 90 , justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center'}}
                            >Status</TableCell>
                            <TableCell
                            style={{ justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center' }}
                            >Objet</TableCell>
                            <TableCell style={{ justifyContent: 'center',
                               alignItems: 'center',
                               textAlign: 'center' }} > Description</TableCell>
                            <TableCell style={{ width: 150 , justifyContent: 'center',
                               alignItems: 'center',
                               textAlign: 'center' }} 
                            >Date d'Ouverture</TableCell>
                           
                            {/* <TableCell>Nom d'Agent</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTickets.length > 0 ? (
                            filteredTickets.map((ticket, index) => (
                                <TableRow
                                    key={ticket.idTicketDto}
                                    sx={{ backgroundColor: index % 2 === 0 ? 'white' : '#f5f5f5' ,
                                        borderBottom: '4px solid #232f66'
                                    }}
                                    onClick={() => handleRowClick(ticket.idTicketDto)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell>{ticket.idTicketDto}</TableCell>
                                    <TableCell>{ticket.typeTicketDto}</TableCell>
                                    <TableCell><TruncatedText text={getReferentielLibelle(ticket.themeId)} maxLength={60} /></TableCell>
                                    <TableCell>{getReferentielLibelle(ticket.sousThemeId)}</TableCell>
                                    <TableCell
                                    style={{ width: 90 , justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center' }}
                                    >
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

                                    <TableCell
                                     style={{width: 90 , justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center'}}
                                    >
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

                                    <TableCell
                                    style={{width: 90 , justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center'}}
                                    ><TruncatedText text={ticket.objetDto} maxLength={60} /></TableCell>
                                    <TableCell
                                    style={{width: 90 , justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center'}}
                                    ><TruncatedText text={ticket.descriptionDto} maxLength={100} /></TableCell>
                                    <TableCell style={{ width: 200 , justifyContent: 'center',
                               alignItems: 'center',
                               textAlign: 'center'}}
                                    >{formatDateTime(ticket.dateOuvertureDto)}</TableCell>
                                    
                                   
                                    {/* <TableCell
                                     style={{width: 90 , justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center'}}
                                    >{getUtilisateurName(ticket.idAgentDto)}</TableCell> */}
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
