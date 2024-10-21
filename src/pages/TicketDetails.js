import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTicketDetailsRequest, fetchTicketAttachmentsRequest } from '../actions/ticketActions';
import { fetchUtilisateursRequest } from '../actions/utilisateurActions';
import { fetchReferentielsRequest } from '../actions/referentialActions';
import { Paper, Typography, Grid, Button,Box , Container } from '@mui/material';
import TruncatedText from '../components/TruncatedText';
import Header from '../components/Header';
import BreadcrumbsComponent from '../components/BreadcrumbsComponent';
import Chat from '../components/Chat';
import axios from 'axios';

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

const getStatusColor = (status) => {
    switch (status) {
        case 'Nouveau':
            return '#A9A9A9'; // Gray
        case 'Affecte':
            return '#007BFF'; // Blue
        case 'En_Attente':
            return '#FFA500'; // Orange
        case 'Repondu':
            return '#9c27b0'; // Purple
        case 'Resolu':
            return '#28A745'; // Green
        case 'Cloture':
            return '#8B0000'; // Dark Red
        default:
            return 'gray'; // Default color if no match
    }
};


const TicketDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { ticketDetails, loading, error, ticketAttachments } = useSelector(state => state.tickets);
    const { utilisateurs } = useSelector(state => state.utilisateurs);
    const { referentiels } = useSelector(state => state.referentiels);

    useEffect(() => {
        dispatch(fetchTicketDetailsRequest(id));
        dispatch(fetchUtilisateursRequest());
        dispatch(fetchReferentielsRequest());
        dispatch(fetchTicketAttachmentsRequest(id)); // Fetch attachments for the ticket
    }, [dispatch, id]);

    const getUtilisateurName = (id) => {
        const utilisateur = utilisateurs.find(u => u.id === id);
        return utilisateur ? utilisateur.nomUtilisateur : 'N/A';
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Formats date and time based on locale
    };

    const getReferentielLibelle = (id) => {
        const referentiel = referentiels.find(r => r.id === id);
        return referentiel ? referentiel.libelle : 'N/A';
    };

    const handleDownloadAttachment = async (attachmentId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/ticketAttachements/download/${attachmentId}`, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition) {
                const filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
                link.setAttribute('download', filename);
            } else {
                link.setAttribute('download', `download_${attachmentId}`);
            }

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error while downloading attachment', error);
        }
    };

    const handleTraiter = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('No user ID found in local storage');
                return;
            }

            const updatedTicket = {
                ...ticketDetails,
                idAgentDto: parseInt(userId, 10), // Update idAgentDto with the userId from local storage
                statusDto: 'Affecte',
            };

            await axios.put(`http://localhost:8080/api/tickets/${id}`, updatedTicket);

            // Optionally, refetch the ticket details to reflect the update
            dispatch(fetchTicketDetailsRequest(id));
        } catch (error) {
            console.error('Error updating ticket', error);
        }
    };

    const handleRepondre = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('No user ID found in local storage');
                return;
            }
    
            const updatedTicket = {
                ...ticketDetails,
                idAgentDto: parseInt(userId, 10), // Update idAgentDto with the userId from local storage
                statusDto: 'Repondu',
            };
    
            // Update the ticket status to "Repondu"
            await axios.put(`http://localhost:8080/api/tickets/${id}`, updatedTicket);
    
            // Optionally, refetch the ticket details to reflect the update
            dispatch(fetchTicketDetailsRequest(id));
    
            // Now, send the email to the client
            await axios.post(`http://localhost:8080/api/tickets/${id}/notify-client`, {
                clientId: ticketDetails.idClientDto,
            });
    
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error updating ticket or sending email', error);
        }
    };
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!ticketDetails) {
        return <p>No ticket details available</p>;
    }

    return (
        <Container maxWidth="xl">
            <Header />
            <BreadcrumbsComponent />
            
            <Typography 
                variant="h5" 
                sx={{ 
                    textAlign: 'center', 
                    marginY: 2,
                    padding: 1,
                    border: '2px solid #232f66',
                    backgroundColor: '#9c27b0',
                    color: 'white',
                    borderRadius: 2
                }}
            >
                ID de Ticket : {ticketDetails.idTicketDto}
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            height: '80vh',
                            overflow: 'auto',
                            border: '2px solid #232f66',
                            borderRadius: 2,
                            p: 2
                        }}
                    >
                        {ticketDetails.statusDto !== 'Nouveau' && ticketDetails.statusDto !== 'Cloture' && (
                            <Chat
                             ticketId={id} />
                        )}
                    </Paper>
                </Grid>
                
                <Grid item xs={12} md={8}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            height: '80vh',
                            overflow: 'auto',
                            border: '2px solid #232f66',
                            backgroundColor: 'rgba(224, 224, 224, 0.5)',
                            borderRadius: 2,
                            p: 3
                        }}
                    >
                        <Grid container spacing={2}>
                            {/* Information Fields */}
                            {[
                                { label: 'Type', value: ticketDetails.typeTicketDto },
                                { label: "Date d'Ouverture", value: formatDateTime(ticketDetails.dateOuvertureDto) },
                                { label: 'Date de résolution', value: ticketDetails.dateResolutionDto ? formatDateTime(ticketDetails.dateResolutionDto) : 'N/A' },
                                { label: 'Date de fermeture', value: ticketDetails.dateResolutionDto ? formatDateTime(ticketDetails.dateResolutionDto) : 'N/A' },
                                { label: 'Thème', value: getReferentielLibelle(ticketDetails.themeId) },
                                { label: 'Sous Thème', value: getReferentielLibelle(ticketDetails.sousThemeId) },
                                { label: 'Status', value: ticketDetails.statusDto, color: getStatusColor(ticketDetails.statusDto) },
                                { label: "Niveau d'Urgence", value: ticketDetails.niveauUrgenceDto, color: getUrgencyColor(ticketDetails.niveauUrgenceDto) },
                                { label: 'Objet', value: ticketDetails.objetDto },
                                { label: 'Description', value: <TruncatedText text={ticketDetails.descriptionDto} maxLength={300} />},
								{ label: "Nom d'agent", value: getUtilisateurName(ticketDetails.idAgentDto)},
								{ label: 'Nom du client', value: getUtilisateurName(ticketDetails.idClientDto)}
                            ].map((item, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Box 
                                        sx={{ 
                                            display: 'flex', 
                                            flexDirection: 'column',
                                            border: '1px solid #232f66', 
                                            borderRadius: 1,
                                            p: 1,
                                            height: '100%',
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {item.label}:
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            {item.color && (
                                                <Box 
                                                    component="span" 
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        backgroundColor: item.color,
                                                        marginRight: 1,
                                                        borderRadius: '2px',
                                                        border: '1px solid black'
                                                    }}
                                                />
                                            )}
                                            <Typography>{item.value}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}

                            {/* Attachments */}
                            <Grid item xs={12}>
                                <Typography variant="h6">Attachments:</Typography>
                                {ticketAttachments.length === 0 ? (
                                    <Typography color="textSecondary">Aucune pièce jointe disponible.</Typography>
                                ) : (
                                    ticketAttachments.map(attachment => (
                                        <Box key={attachment.idTicAttachDto} sx={{ mb: 1 }}>
                                            <Typography>{attachment.fileNameDto}</Typography>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleDownloadAttachment(attachment.idTicAttachDto)}
                                                size="small"
                                            >
                                                Download
                                            </Button>
                                        </Box>
                                    ))
                                )}
                            </Grid>

                            {/* Action Buttons */}
                            <Grid item xs={12}>
                                {ticketDetails.statusDto === 'Nouveau' && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleTraiter}
                                        fullWidth
                                    >
                                        Traiter
                                    </Button>
                                )}
                                {(ticketDetails.statusDto === 'Affecte' || ticketDetails.statusDto === 'En_Attente') && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleRepondre}
                                        fullWidth
                                    >
                                        Répondre
                                    </Button>
                                )}

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TicketDetails;
