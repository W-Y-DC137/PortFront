import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  CircularProgress, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  TextField,
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFiltre, setRoleFiltre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  useEffect(() => {
    axios.get('http://localhost:8080/api/utilisateurs/roles?roles=AGENT&roles=CLIENT')
      .then(response => {
        setUtilisateurs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
        setLoading(false);
      });
  }, []);

  const handleRoleChange = (event) => {
    setRoleFiltre(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const utilisateursFiltres = utilisateurs.filter(utilisateur => {
    const roleMatch = roleFiltre ? utilisateur.role === roleFiltre : true;
    const query = searchQuery.toLowerCase();
    const searchMatch = 
      utilisateur.nomUtilisateur.toLowerCase().includes(query) ||
      utilisateur.email.toLowerCase().includes(query) ||
      utilisateur.role.toLowerCase().includes(query);
    return roleMatch && searchMatch;
  });

  // Fonction pour rediriger vers la page de l'utilisateur
  const handleRowClick = (id) => {
    navigate(`/users/${id}`); // Rediriger vers la page de l'utilisateur avec son ID
  };

  return (
    <div>
      <Header />
      <BreadcrumbsComponent/>
      <h1>La liste des utilisateurs</h1>

      <Box display="flex" alignItems="center" gap={2} marginBottom={3}>
        <TextField
          label="Recherche"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Rechercher par nom, email ou rôle"
          fullWidth
        />
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Filtrer par rôle</InputLabel>
          <Select
            value={roleFiltre}
            onChange={handleRoleChange}
            label="Filtrer par rôle"
          >
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="AGENT">Agent</MenuItem>
            <MenuItem value="CLIENT">Client</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
  <Button 
    variant="contained" 
    color="primary" 
    onClick={() => navigate('/users/adding')}
  >
    Ajouter
  </Button>
</Box>


      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nom Utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {utilisateursFiltres.map((utilisateur) => (
                <TableRow 
                  key={utilisateur.id} 
                  onClick={() => handleRowClick(utilisateur.id)} // Rendre la ligne cliquable
                  style={{ cursor: 'pointer' }} // Changer le curseur pour indiquer qu'elle est cliquable
                >
                  <TableCell>{utilisateur.id}</TableCell>
                  <TableCell>{utilisateur.nomUtilisateur}</TableCell>
                  <TableCell>{utilisateur.email}</TableCell>
                  <TableCell>{utilisateur.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ListeUtilisateurs;
