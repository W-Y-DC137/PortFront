import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend
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

  return (
    <div>
      <Header />
      <h1>La liste des utilisateurs</h1>
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
                <TableCell>Rénitialiser le mot de passe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {utilisateurs.map((utilisateur) => (
                <TableRow key={utilisateur.id}>
                  <TableCell>{utilisateur.id}</TableCell>
                  <TableCell>{utilisateur.nomUtilisateur}</TableCell>
                  <TableCell>{utilisateur.email}</TableCell>
                  <TableCell>{utilisateur.role}</TableCell>
                  <TableCell>{utilisateur.motDePasse}</TableCell>
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
