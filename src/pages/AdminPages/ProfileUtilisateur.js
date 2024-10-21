import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importer useNavigate pour rediriger
import axios from 'axios';
import AdminHeader from '../../components/Header';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import { 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress, 
  Grid, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';

const UtilisateurDétails = () => {
  const { id } = useParams(); // Récupérer l'ID de l'utilisateur depuis l'URL
  const [utilisateur, setUtilisateur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // État pour ouvrir/fermer le dialogue de confirmation
  const navigate = useNavigate(); // Utiliser useNavigate pour rediriger après la suppression

  useEffect(() => {
    // Remplacez l'URL par celle correspondant à votre API pour récupérer un utilisateur par ID
    axios.get(`http://localhost:8080/api/utilisateurs/${id}`)
      .then(response => {
        setUtilisateur(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
        setError('Impossible de récupérer les détails de l\'utilisateur.');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/utilisateurs/${id}`)
      .then(() => {
        alert('Utilisateur supprimé avec succès.');
        navigate('/admin/users'); // Rediriger vers la liste des utilisateurs après suppression
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        alert('Erreur lors de la suppression de l\'utilisateur.');
      });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
      <AdminHeader />
      <BreadcrumbsComponent/>
      <Typography variant="h4" gutterBottom style={{ margin: '20px' }}>
        Détails de l'utilisateur
      </Typography>

      <Card style={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">ID Utilisateur</Typography>
              <Typography variant="body1">{utilisateur.id}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Nom d'utilisateur</Typography>
              <Typography variant="body1">{utilisateur.nomUtilisateur}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">{utilisateur.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Rôle</Typography>
              <Typography variant="body1">{utilisateur.role}</Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleOpenDialog} // Ouvrir le dialogue de confirmation
              >
                Supprimer
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Boîte de dialogue de confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous vraiment supprimer cet utilisateur ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Oui, supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UtilisateurDétails;
