import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, MenuItem, Grid, Container } from '@mui/material';
import Header from '../../components/Header';
import { fetchReferentielsRequest } from '../../actions/referentialActions';
import { request } from '../../apis/axios_helper'; // Adjust the path as necessary

const CreateTicket = () => {
  const dispatch = useDispatch();
  const { referentiels, loading, error } = useSelector(state => state.referentiels);

  const [ticket, setTicket] = useState({
    typeTicketDto: '',
    themeId: '',
    sousThemeId: '',
    niveauUrgenceDto: '',
    objetDto: '',
    descriptionDto: ''
  });

  const [themes, setThemes] = useState([]);
  const [sousThemes, setSousThemes] = useState([]);
  const [attachments, setAttachments] = useState([]); // For handling attachments

  useEffect(() => {
    dispatch(fetchReferentielsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (referentiels.length) {
      const themeList = referentiels.filter(r => r.parent && r.parent.id === 1);
      setThemes(themeList);
      setSousThemes([]);
      if (!themeList.find(theme => theme.id === ticket.themeId)) {
        setTicket(prevState => ({ ...prevState, sousThemeId: '' }));
      }
    }
  }, [referentiels]);

  useEffect(() => {
    if (ticket.themeId) {
      const selectedTheme = referentiels.find(r => r.id === parseInt(ticket.themeId));
      if (selectedTheme) {
        setSousThemes(referentiels.filter(r => r.parent && r.parent.id === selectedTheme.id));
      } else {
        setSousThemes([]);
      }
    }
  }, [ticket.themeId, referentiels]);

  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setAttachments(e.target.files);
  };

  const handleCancel = () => {
    setTicket({
      typeTicketDto: '',
      themeId: '',
      sousThemeId: '',
      niveauUrgenceDto: '',
      objetDto: '',
      descriptionDto: ''
    });
    setAttachments([]); // Clear attachments
  };

  const handleSubmit = async () => {
    const dateOuvertureDto = new Date();
    const idClientDto = localStorage.getItem('userId'); // Retrieve the actual ID of the authenticated user
  
    const newTicket = {
      ...ticket,
      dateOuvertureDto,
      idClientDto, // Use the retrieved user ID
      statusDto: 'Nouveau'
    };
    try {
       const response = await request('post', '/api/tickets', newTicket);
       console.log(response.data); // Check the response structure
       const ticketId = response.data.idTicketDto;  // Assuming the response contains the created ticket's ID
       console.log(ticketId);
      // If attachments exist, upload them
      if (attachments.length > 0) {
        for (let i = 0; i < attachments.length; i++) {
          const formData = new FormData();
          formData.append('file', attachments[i]);
          await request('post', `/api/ticketAttachements/upload/${ticketId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        }
      }
      
      console.log('Ticket and attachments created:', response.data);
      // Redirect to another page or display success message
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Handle error, display error message
    }
  };

  return (
    <Container>
      <Header />
      <h1>Formulaire pour créer un ticket</h1>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Type"
            name="typeTicketDto"
            value={ticket.typeTicketDto}
            onChange={handleChange}
            fullWidth
            select
          >
            <MenuItem value="Reclamation">Reclamation</MenuItem>
            <MenuItem value="Demande">Demande</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Thème"
            name="themeId"
            value={ticket.themeId}
            onChange={handleChange}
            fullWidth
            select
          >
            {themes.map(theme => (
              <MenuItem key={theme.id} value={theme.id}>
                {theme.libelle}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Sous-Thème"
            name="sousThemeId"
            value={ticket.sousThemeId}
            onChange={handleChange}
            fullWidth
            select
          >
            {sousThemes.map(sousTheme => (
              <MenuItem key={sousTheme.id} value={sousTheme.id}>
                {sousTheme.libelle}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Niveau d'Urgence"
            name="niveauUrgenceDto"
            value={ticket.niveauUrgenceDto}
            onChange={handleChange}
            fullWidth
            select
          >
            <MenuItem value="FAIBLE">Faible</MenuItem>
            <MenuItem value="MOYEN">Moyen</MenuItem>
            <MenuItem value="ELEVE">Élevé</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Objet"
            name="objetDto"
            value={ticket.objetDto}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            name="descriptionDto"
            value={ticket.descriptionDto}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <input type="file" multiple onChange={handleFileChange} />
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Enregistrer
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="secondary" onClick={handleCancel} fullWidth>
            Annuler
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateTicket;
