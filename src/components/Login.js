import React, { useState } from "react";
import {jwtDecode} from "jwt-decode";
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import PortLogo from './images/PortLogo.png';
import { request } from "../apis/axios_helper";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await request('post', '/api/auth/authenticate', { username, password });
            const { token } = response.data;

            //localStorage.setItem('token', token);

            const userToken = token || localStorage.getItem("token");
            if (!userToken) {
              //redirectToPortnet();
              console.log("Interdit")
            }
            const decodedToken = jwtDecode(userToken);
            
            //if (isTokenExpired(decodedToken)) {
              //redirectToPortnet();
            //} 
            
              localStorage.setItem("token", userToken);
             /* dispatch(
                setUserInfos({
                  token: userToken,
                  authorities: decodedToken.roles,
                  username: decodedToken.username,
                })
              );*/
            
            const role = decodedToken.role
            //console.log("hello decodedToken",decodedToken)

            localStorage.setItem('role', role);
            // Redirect based on role
            if (role === 'ADMIN') {
                window.location.href = '/admin';
            } else if (role === 'AGENT') {
                window.location.href = '/agent';
            } else if(role=='CLIENT'){ 
                //console.log("hello from client")
                window.location.href = '/client';
            } else {

                console.log('erreur')
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Grid>
            <Typography style={{ marginBottom: '16px', fontSize: '24px', textAlign: 'center' }}>
                Bienvenu sur l’espace des réclamations du PORTNET, nous sommes là pour vous aider à résoudre vos problèmes rapidement et efficacement.
            </Typography>
            <Grid align='center' style={{ marginBottom: '40px' }}>
                <img src={PortLogo} alt="Enterprise Logo" style={{ maxWidth: '300px', height: 'auto' }} />
            </Grid>
            <Paper elevation={10} style={{ padding: 20, height: '45vh', width: 300, margin: "20px auto" }}>
                <Grid align='center'>
                    <Avatar style={{ backgroundColor: '#232f66' }}>
                        <LockIcon />
                    </Avatar>
                    <h2>Se connecter</h2>
                </Grid>
                <form onSubmit={handleLogin}>
                    <TextField 
                        label="Nom d'utilisateur" 
                        placeholder="Entrer votre nom d'utilisateur" 
                        variant="outlined" 
                        fullWidth 
                        style={{ marginBottom: '16px' }} 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField 
                        label="Mot de passe" 
                        type="password" 
                        placeholder="Entrer votre mot de passe" 
                        variant="outlined" 
                        fullWidth 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Se souvenir de moi"
                    />
                    <Button 
                        type="submit" 
                        style={{ backgroundColor: '#232f66', color: '#ffffff' }} 
                        fullWidth
                    >
                        Se connecter
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default Login;
