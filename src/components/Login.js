import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import LockIcon from '@mui/icons-material/Lock';
import PortLogo from './images/PortLogo.png';
import { request } from "../apis/axios_helper";
import backgroundVideo from './images/background.mp4'; // Ensure this path is correct

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await request('post', '/api/auth/authenticate', { username, password });
            const { token } = response.data;
    
            if (token) {
                const decodedToken = jwtDecode(token);
                localStorage.setItem("token", token);
                localStorage.setItem('role', decodedToken.role);
                localStorage.setItem('userId', decodedToken.id);
    
                if (decodedToken.role === 'ADMIN') {
                    navigate("/admin");
                } else if (decodedToken.role === 'AGENT') {
                    navigate("/agent");
                } else if (decodedToken.role === 'CLIENT') {
                    navigate("/client");
                }
            } else {
                console.log("No token received");
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <video 
                autoPlay 
                loop 
                muted 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
            >
                <source src={backgroundVideo} type="video/mp4" />
            </video>
            <Grid container 
                  justifyContent="center" 
                  alignItems="center" 
                  style={{ height: '100vh' }}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper elevation={10} style={{ padding: 20, textAlign: 'center' }}>
                        <Typography style={{ marginBottom: '16px', fontSize: '24px' }}>
                            Bienvenue sur la Plate-forme de demande
                            <br />
                            Cette plate-forme vous permet de soumettre vos demandes en ligne.
                        </Typography>
                        <Grid align='center' style={{ marginBottom: '40px' }}>
                            <img src={PortLogo} alt="Enterprise Logo" style={{ maxWidth: '300px', height: 'auto' }} />
                        </Grid>
                        <Avatar style={{ backgroundColor: '#232f66', margin: '0 auto', marginBottom: '20px' }}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="h5" style={{ marginBottom: '20px' }}>
                            Se connecter
                        </Typography>
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
                                style={{ backgroundColor: '#232f66', color: '#ffffff', marginTop: '16px' }} 
                                fullWidth
                            >
                                Se connecter
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
