// src/pages/AjouterUtilisateur.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/Header';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Paper,
  Box,
  Alert,
} from '@mui/material';

const AjouterUtilisateur = () => {
  const navigate = useNavigate();

  // États pour les champs du formulaire
  const [nomUtilisateur, setNomUtilisateur] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  // États pour les messages de succès et d'erreur
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // États pour la validation
  const [errors, setErrors] = useState({});

  // Fonction de validation du formulaire
  const validate = () => {
    const newErrors = {};
    if (!nomUtilisateur) newErrors.nomUtilisateur = 'Le nom d\'utilisateur est requis.';
    if (!email) {
      newErrors.email = 'L\'email est requis.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'L\'email est invalide.';
    }
    if (!role) newErrors.role = 'Le rôle est requis.';
    if (!motDePasse) {
      newErrors.motDePasse = 'Le mot de passe est requis.';
    } else if (motDePasse.length < 6) {
      newErrors.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    const utilisateurData = {
      nomUtilisateur,
      email,
      role,
      motDePasse,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/utilisateurs', utilisateurData);
      setSuccessMessage('Utilisateur ajouté avec succès.');
      // Optionnel : Réinitialiser le formulaire
      setNomUtilisateur('');
      setEmail('');
      setRole('');
      setMotDePasse('');
      // Optionnel : Rediriger vers la liste des utilisateurs après un court délai
      setTimeout(() => {
        navigate('/utilisateurs');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      setErrorMessage('Erreur lors de l\'ajout de l\'utilisateur.');
    }
  };

  return (
    <div>
      <AdminHeader />
      <BreadcrumbsComponent />
      <Container maxWidth="sm" style={{ marginTop: '40px' }}>
        <Paper elevation={3} style={{ padding: '30px' }}>
          <Typography variant="h5" gutterBottom>
            Ajouter un nouvel utilisateur
          </Typography>

          {/* Afficher les messages de succès ou d'erreur */}
          {successMessage && <Alert severity="success" style={{ marginBottom: '20px' }}>{successMessage}</Alert>}
          {errorMessage && <Alert severity="error" style={{ marginBottom: '20px' }}>{errorMessage}</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Nom d'utilisateur"
                  variant="outlined"
                  fullWidth
                  value={nomUtilisateur}
                  onChange={(e) => setNomUtilisateur(e.target.value)}
                  error={!!errors.nomUtilisateur}
                  helperText={errors.nomUtilisateur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth error={!!errors.role}>
                  <InputLabel>Rôle</InputLabel>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Rôle"
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="CLIENT">CLIENT</MenuItem>
                    <MenuItem value="AGENT">AGENT</MenuItem>
                  </Select>
                  {errors.role && <Typography color="error" variant="caption">{errors.role}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Mot de passe"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  error={!!errors.motDePasse}
                  helperText={errors.motDePasse}
                />
              </Grid>

              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" type="submit">
                  Ajouter l'utilisateur
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AjouterUtilisateur;
