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
  const [themes, setThemes] = useState([]);
  const [sousThemes, setSousThemes] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    // Fetch themes and sousThemes from your API and update state
  }, [ticket.themeId]);

  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
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
    </div>
  );
};

export default CreateTicket;
