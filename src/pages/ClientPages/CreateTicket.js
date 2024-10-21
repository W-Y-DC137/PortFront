<<<<<<< HEAD
import React, { useEffect, useState , useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CloudUpload } from '@mui/icons-material'; // Import the CloudUpload icon
import { TextField, Button, MenuItem, Grid, Container,IconButton , Typography ,Checkbox,  FormControlLabel} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import Header from '../../components/Header';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import { fetchReferentielsRequest } from '../../actions/referentialActions';
import { request } from '../../apis/axios_helper'; // Adjust the path as necessary
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Container, Grid,
  TextField, MenuItem, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Divider, Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Icon for the file picker button
import DeleteIcon from '@mui/icons-material/Delete'; // Icon for file delete button
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6

const CreateTicket = () => {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({
    typeTicketDto: '',
    themeId: '',
    sousThemeId: '',
    niveauUrgenceDto: '',
    objetDto: '',
    descriptionDto: ''
  });
<<<<<<< HEAD


  const [themes, setThemes] = useState([]);
  const [sousThemes, setSousThemes] = useState([]);
  const [attachments, setAttachments] = useState([]); // For handling attachments
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const recaptchaRef = useRef(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaKey, setCaptchaKey] = useState("6LfJVzkqAAAAAH5-VWsFu-bTyiagG4Dnnu2O-JK-"); 

  
  const updateCaptchaKey = () => {
    setCaptchaKey(prevKey => prevKey + "_new"); 
  };

  const onCaptchaChange = (value) => {
    setCaptchaVerified(!!value); // If CAPTCHA value exists, verification is successful
  };

  
=======
  const [themes, setThemes] = useState([]);
  const [sousThemes, setSousThemes] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6

  useEffect(() => {
    // Fetch themes and sousThemes from your API and update state
  }, [ticket.themeId]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({
      ...ticket,
      [name]: value
    });
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '' // Clear the specific error
    }));
  };

  const handleFileChange = (e) => {
<<<<<<< HEAD
    setAttachments(e.target.files);
    const files = Array.from(e.target.files);
    setSelectedFiles(files.map((file) => file.name));
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    const isFormEmpty = Object.values(ticket).every((value) => value === '');
    
    if (isFormEmpty) {
      navigate(-1); // This will navigate back to the previous page
    } else {
      setTicket({
        typeTicketDto: '',
        themeId: '',
        sousThemeId: '',
        niveauUrgenceDto: '',
        objetDto: '',
        descriptionDto: ''
      });
      setAttachments([]); // Clear attachments
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ticket.typeTicketDto) newErrors.typeTicketDto = "Le type est obligatoire";
    if (!ticket.themeId) newErrors.themeId = "Le thème est obligatoire";
    if (!ticket.sousThemeId) newErrors.sousThemeId = "Le sous-thème est obligatoire";
    if(!ticket.niveauUrgenceDto) newErrors.niveauUrgenceDto = "Le niveau d'urgence est obligatoire";
    if(!ticket.objetDto) newErrors.objetDto ="L'objet est obligatoire";
    if (!ticket.descriptionDto) newErrors.descriptionDto = "La description est obligatoire";
    if (!acceptTerms) newErrors.acceptTerms = "Vous devez accepter les conditions d'utilisation";
    if (!captchaVerified) newErrors.captcha = "Veuillez vérifier que vous n'êtes pas un robot.";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const dateOuvertureDto = new Date();
    const idClientDto = localStorage.getItem('userId'); // Retrieve the actual ID of the authenticated user

    const newTicket = {
        ...ticket,
        dateOuvertureDto,
        idClientDto, // Use the retrieved user ID
        statusDto: 'Nouveau',
    };
    try {
        const response = await request('post', '/api/tickets', newTicket);
        const ticketId = response.data.idTicketDto;

        // If attachments exist, upload them
        if (attachments.length > 0) {
            for (let i = 0; i < attachments.length; i++) {
                const formData = new FormData();
                formData.append('file', attachments[i]);

                await request('post', `/api/ticketAttachements/upload/${ticketId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // This is now correctly handled in the axios helper
                    }
                });
            }
        }

        console.log('Ticket and attachments created:', response.data);

        // Reset the form after successful submission
        setTicket({
          typeTicketDto: '',
          themeId: '',
          sousThemeId: '',
          niveauUrgenceDto: '',
          objetDto: '',
          descriptionDto: '',
        });
        setAttachments([]);
        setSelectedFiles([]);
        setCaptchaVerified(false);

        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
          updateCaptchaKey(); // Update CAPTCHA key to force a new instance
        }
    
        // Display success message
        setSuccessMessage('Le ticket a été créé avec succès !');
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Adjust the time as needed
      } catch (error) {
        console.error('Error creating ticket:', error);
      }
    
};
=======
    setAttachments([...attachments, ...e.target.files]);
  };

  const handleDeleteFile = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request.post('/api/tickets', ticket);
      navigate('/client');
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  const handleReset = () => {
    setTicket({
      typeTicketDto: '',
      themeId: '',
      sousThemeId: '',
      niveauUrgenceDto: '',
      objetDto: '',
      descriptionDto: ''
    });
    setAttachments([]);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6

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

  return (
    <div>
<<<<<<< HEAD
    <Header />
    <BreadcrumbsComponent />
    <Container>
      
      <h4>Les champs obligatoires sont marqués par un 
        <span style={{ color: 'red' }}>*</span>
      </h4>
      <Grid container spacing={3}>
      {successMessage && (
        <Grid item xs={12} >
          <p style={{ backgroundColor: '#d4edda',
      color: '#155724',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #c3e6cb',
      textAlign: 'center',
      marginTop: '20px', }}>{successMessage} </p>
        </Grid>
                )}
        <Grid item xs={12}>
          <TextField
            label={<span>Type <span style={{ color: 'red' }}>*</span></span>}
            name="typeTicketDto"
            value={ticket.typeTicketDto}
            onChange={handleChange}
            fullWidth
            select
            error={!!errors.typeTicketDto} // Show error when validation fails
            helperText={errors.typeTicketDto} // Display the error message
          >
            <MenuItem value="Reclamation">Reclamation</MenuItem>
            <MenuItem value="Demande">Demande</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label={<span>Thème <span style={{ color: 'red' }}>*</span></span>}
            name="themeId"
            value={ticket.themeId}
            onChange={handleChange}
            fullWidth
            select
            error={!!errors.themeId} // Show error when validation fails
            helperText={errors.themeId} // Display the error message
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
            label={<span>Sous Thème <span style={{ color: 'red' }}>*</span></span>}
            name="sousThemeId"
            value={ticket.sousThemeId}
            onChange={handleChange}
            fullWidth
            select
            error={!!errors.sousThemeId} // Show error when validation fails
            helperText={errors.sousThemeId} // Display the error message
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
            label={<span>Niveau d'urgence <span style={{ color: 'red' }}>*</span></span>}
            name="niveauUrgenceDto"
            value={ticket.niveauUrgenceDto}
            onChange={handleChange}
            fullWidth
            select
            error={!!errors.niveauUrgenceDto} // Show error when validation fails
            helperText={errors.niveauUrgenceDto} // Display the error message
          >
            <MenuItem value="FAIBLE">Faible</MenuItem>
            <MenuItem value="MOYEN">Moyen</MenuItem>
            <MenuItem value="ELEVE">Élevé</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" paragraph>
               Pour mieux vous servir, merci de préciser le n° enregistrement, code client, … ou toute autre référence, nous permettons de traiter rapidement votre demande.
        </Typography>
        <TextField
               label={<span>Objet <span style={{ color: 'red' }}>*</span></span>}
               name="objetDto"
               value={ticket.objetDto}
               onChange={handleChange}
               fullWidth
               error={!!errors.objetDto}
               helperText={errors.objetDto}
        />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label={<span>Description <span style={{ color: 'red' }}>*</span></span>}
            name="descriptionDto"
            value={ticket.descriptionDto}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            error={!!errors.descriptionDto} // Show error when validation fails
            helperText={errors.descriptionDto} // Display the error message
          />
        </Grid>

        <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" paragraph>
        Vous pouvez joindre tout document (photo, fichier électronique, document scanné etc.) dont la taille ne dépasse pas 5 Mo.
        Les formats acceptés sont PDF et Image. Pour joindre plusieurs fichiers, uilisez le format ZIP. (pdf,jpeg,jpg,png,gif,mp3,wav,aac,au,m3u,m4a,amr,mpeg,avi,mp4,mov,mpa,mpg,wma,3gp)
        </Typography>
          
  <input
    style={{ display: 'none' }}
    id="upload-file"
    multiple
    type="file"
    onChange={handleFileChange}
  />
  <label htmlFor="upload-file">
    <Button
      variant="contained"
      color="primary"
      component="span"
      startIcon={<CloudUpload />}
      fullWidth
    >
     Ajouter des pièces jointes
    </Button>
  </label>
</Grid>

{selectedFiles.length > 0 && (
  <Grid item xs={12}>
    <ul>
    <Typography variant="body2">Fichiers sélectionnés:</Typography>
      {selectedFiles.map((file, index) => (
        <li key={index}>{file}</li>
      ))}
    </ul>
  </Grid>
)}

<Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  name="acceptTerms"
                />
              }
              label={<span>J'accepte les <a href="/terms" target="_blank" rel="noopener noreferrer">conditions d'utilisation</a> <span style={{ color: 'red' }}>*</span>Conformément à la loi 09-08, vous disposez d’un droit d’accès, de rectification et d’opposition au traitement de vos données personnelles. Ce traitement a été autorisé par la CNDP sous le n° A-GC-318/2016.</span>}
            />
            {errors.acceptTerms && <Typography color="error">{errors.acceptTerms}</Typography>}
          </Grid>

          <Grid item xs={12}>
          <ReCAPTCHA
            sitekey={captchaKey} // Use dynamic CAPTCHA key
            onChange={onCaptchaChange}
            ref={recaptchaRef}
          />
          {errors.captcha && <Typography color="error">{errors.captcha}</Typography>}
          </Grid>



        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth disabled={!acceptTerms}>
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

      <Container>
        <Typography
          variant="h4"
          align="center"
          style={{ marginTop: '20px', color: '#232f66' }}
        >
          Soumettre une demande
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Type de demande"
                name="typeTicketDto"
                value={ticket.typeTicketDto}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="Reclamation">Réclamation</MenuItem>
                <MenuItem value="Demande d'information">Demande d'information</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Niveau d'urgence"
                name="niveauUrgenceDto"
                value={ticket.niveauUrgenceDto}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="Faible">Faible</MenuItem>
                <MenuItem value="Moyen">Moyen</MenuItem>
                <MenuItem value="Urgent">Urgent</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Thème"
                name="themeId"
                value={ticket.themeId}
                onChange={handleChange}
                fullWidth
                required
              >
                {themes.map(theme => (
                  <MenuItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Sous-thème"
                name="sousThemeId"
                value={ticket.sousThemeId}
                onChange={handleChange}
                fullWidth
                required
                disabled={!sousThemes.length}
              >
                {sousThemes.map(sousTheme => (
                  <MenuItem key={sousTheme.id} value={sousTheme.id}>
                    {sousTheme.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Objet"
                name="objetDto"
                value={ticket.objetDto}
                onChange={handleChange}
                fullWidth
                required
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
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                component="label"
                startIcon={<AttachFileIcon />}
                style={{ backgroundColor: '#232f66' }} // Match button color with "Accueil"
              >
                Pièces jointes
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
              </Button>
              <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginTop: '5px' }}>
                Joignez des fichiers jusqu'à 5 Mo. Formats acceptés : PDF, images (JPEG, PNG, GIF), et fichiers ZIP.
              </Typography>
              {attachments.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  {attachments.map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      onDelete={() => handleDeleteFile(index)}
                      deleteIcon={<DeleteIcon />}
                      style={{ marginRight: '10px' }}
                    />
                  ))}
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleReset}
                style={{ backgroundColor: '#ff3d00' }} // Match button color with "Accueil"
              >
                Réinitialiser le formulaire
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                style={{ backgroundColor: '#232f66' }} // Match button color with "Accueil"
              >
                Enregistrer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6
    </div>
  );
};

export default CreateTicket;
