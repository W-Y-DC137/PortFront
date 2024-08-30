import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTicketDetailsRequest, fetchTicketAttachmentsRequest } from '../../actions/ticketActions';
import { fetchUtilisateursRequest } from '../../actions/utilisateurActions';
import { fetchReferentielsRequest } from '../../actions/referentialActions';
import { Paper, Typography, Grid, Button } from '@mui/material';
import Header from '../../components/Header';
import axios from 'axios';

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

    const getUtilisateurName = (id) => {
        const utilisateur = utilisateurs.find(u => u.id === id);
        return utilisateur ? utilisateur.nomUtilisateur : 'N/A';
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
        <div>
            <Header />
            <Paper  style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Ticket Details
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h6">Ticket ID:</Typography>
                        <Typography>{ticketDetails.idTicketDto}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Type:</Typography>
                        <Typography>{ticketDetails.typeTicketDto}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Theme:</Typography>
                        <Typography>{getReferentielLibelle(ticketDetails.themeId)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">SousTheme:</Typography>
                        <Typography>{getReferentielLibelle(ticketDetails.sousThemeId)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Niveau d'Urgence:</Typography>
                        <Typography>{ticketDetails.niveauUrgenceDto}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Objet:</Typography>
                        <Typography>{ticketDetails.objetDto}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Description:</Typography>
                        <Typography>{ticketDetails.descriptionDto}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Date d'Ouverture:</Typography>
                        <Typography>{ticketDetails.dateOuvertureDto}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Date de résolution:</Typography>
                        <Typography>{ticketDetails.dateResolutionDto}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Date de fermeture:</Typography>
                        <Typography>{ticketDetails.dateFermetureDto}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Nom du Client:</Typography>
                        <Typography>{getUtilisateurName(ticketDetails.idClientDto)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Nom d'Agent:</Typography>
                        <Typography>{getUtilisateurName(ticketDetails.idAgentDto)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Status:</Typography>
                        <Typography>{ticketDetails.statusDto}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Attachments:</Typography>
                        {ticketAttachments.map(attachment => (
                            <div key={attachment.idTicAttachDto}>
                                <Typography>{attachment.fileNameDto}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleDownloadAttachment(attachment.idTicAttachDto)}
                                >
                                    Download
                                </Button>
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default TicketDetailsClient;
