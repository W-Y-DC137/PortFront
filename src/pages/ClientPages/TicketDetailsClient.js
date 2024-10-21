import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTicketDetailsRequest, fetchTicketAttachmentsRequest } from '../../actions/ticketActions';
import { fetchUtilisateursRequest } from '../../actions/utilisateurActions';
import { fetchReferentielsRequest } from '../../actions/referentialActions';
import { Paper, Typography, Grid, Button , Box ,Container} from '@mui/material';
import TruncatedText from '../../components/TruncatedText';
import Header from '../../components/Header';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import Chat from '../../components/Chat';
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
            return '#800080'; // Purple
        case 'Resolu':
            return '#28A745'; // Green
        case 'Cloture':
            return 'black'; // Dark Red
        case 'Reouvert':
            return 'red'
        default:
            return 'gray'; // Default color if no match
    }
};

const TicketDetailsClient = () => {
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

    const handleSatisfait = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('No user ID found in local storage');
                return;
            }

            const updatedTicket = {
                ...ticketDetails,
                statusDto: 'Resolu',
            };
            await axios.put(`http://localhost:8080/api/tickets/${id}`,updatedTicket);
            dispatch(fetchTicketDetailsRequest(id)); // Refresh the ticket details after updating status
        } catch (error) {
            console.error('Error updating status to Resolu', error);
        }
    };

    const handleNonSatisfait = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('No user ID found in local storage');
                return;
            }

            const updatedTicket = {
                ...ticketDetails,
                statusDto: 'Affecte',
            };
            await axios.put(`http://localhost:8080/api/tickets/${id}`, updatedTicket);
            dispatch(fetchTicketDetailsRequest(id)); // Refresh the ticket details after updating status
        } catch (error) {
            console.error('Error updating status to Affecte', error);
        }
    };

    

    const getUtilisateurName = (id) => {
        const utilisateur = utilisateurs.find(u => u.id === id);
        return utilisateur ? utilisateur.nomUtilisateur : 'non affecté';
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
                responseType: 'blob', // Ensures that the file is treated as binary data (blob)
            });
    
            // Create a URL for the blob object, specifying the MIME type
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
    
            // Create a new link element
            const link = document.createElement('a');
            link.href = url;
    
            // Determine the file name from the Content-Disposition header
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition) {
                const filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
                link.setAttribute('download', filename);
            } else {
                // Fallback: Use attachment ID if filename is not available
                link.setAttribute('download', `download_${attachmentId}`);
            }
    
            // Append the link to the document body and trigger the download
            document.body.appendChild(link);
            link.click();
    
            // Clean up by removing the link and revoking the object URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
    
        } catch (error) {
            console.error('Error while downloading attachment', error);
        }
    };
    
    
    const handleReouvrire = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('No user ID found in local storage');
                return;
            }

            const updatedTicket = {
                ...ticketDetails,
                statusDto: 'Reouvert',
            };

            await axios.put(`http://localhost:8080/api/tickets/${id}`, updatedTicket);

            // Optionally, refetch the ticket details to reflect the update
            dispatch(fetchTicketDetailsRequest(id));
        } catch (error) {
            console.error('Error updating ticket', error);
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
                            {ticketDetails.statusDto === 'Resolu' && (
                            <>
                            <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleReouvrire}
                            fullWidth
                            >
                                Réouvrir
                                </Button>
                            <p style={{ marginTop: '8px', color: '#777' }}>
                                Vous pouvez réouvrir le ticket si le problème persiste, dans un délai de 7 jours. Sinon, vous devrez créer un nouveau ticket.
                            </p>
                            </>
                             )}


                                {ticketDetails.statusDto === 'Repondu' && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            Si le problème est résolu et vous êtes satisfait :
                                        </Typography>
                                        <Button variant="contained" color="success" onClick={handleSatisfait} fullWidth sx={{ mb: 2 }}>
                                            Satisfait
                                        </Button>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            Si le problème n'est pas résolu ou vous n'êtes pas satisfait :
                                        </Typography>
                                        <Button variant="contained" color="error" onClick={handleNonSatisfait} fullWidth>
                                            Non Satisfait
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TicketDetailsClient;
