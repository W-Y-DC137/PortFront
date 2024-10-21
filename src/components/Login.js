import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate , useLocation } from 'react-router-dom';
import { getAuth, signInWithCustomToken } from 'firebase/auth'; 
import LockIcon from '@mui/icons-material/Lock';
import PortLogo from './images/PortLogo.png';
import { request } from "../apis/axios_helper";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for managing error messages
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors
        try {
            const response = await request('post', '/api/auth/authenticate', { username, password });
            console.log('Response:', response.data); // Add this line to inspect the response data
          
            // Destructure both JWT token and Firebase token from response
           const { token, firebaseToken } = response.data;
           console.log('JWT Token:', token);
           console.log('Firebase Token:', firebaseToken);

           if (token && firebaseToken) {
            // Decode JWT token
            const decodedToken = jwtDecode(token);
            localStorage.setItem("token", token);
            localStorage.setItem('role', decodedToken.role);
            localStorage.setItem('userId', decodedToken.id);
            localStorage.setItem('username', decodedToken.username);

            // Get the redirect URL from the query parameters
            const searchParams = new URLSearchParams(location.search);
            const redirectUrl = searchParams.get('redirect') || '/';


    
    
            

            // Firebase authentication using custom token
            const auth = getAuth(); // Initialize Firebase Auth
            try {
                await signInWithCustomToken(auth, firebaseToken);
                console.log('Firebase authentication successful');
                
                // Redirect to the specified URL or default based on role
                if (redirectUrl !== '/') {
                    navigate(redirectUrl);
                } else {
                    switch(decodedToken.role) {
                        case 'ADMIN':
                            navigate("/admin");
                            break;
                        case 'AGENT':
                            navigate("/agent");
                            break;
                        case 'CLIENT':
                            navigate("/client");
                            break;
                        default:
                            navigate("/");
                    }
                }
            } 
            catch (error) {
                console.error('Firebase authentication failed', error);
                setError("Failed to authenticate with Firebase.");
            }
        } else {
            setError("Nom d'utilisateur ou mot de passe incorrect");
        }
    } catch (error) {
        console.error('Login failed', error);
        setError("Nom d'utilisateur ou mot de passe incorrect");
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
                    {/* Display error message if there is one */}
                    {error && (
                        <Typography color="error" style={{ marginTop: '16px', textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}
                    <Button 
                        type="submit" 
                        style={{ backgroundColor: '#232f66', color: '#ffffff', marginTop: '16px' }} 
                        fullWidth
                    >
                        Se connecter
                    </Button>
                    {/* Forgot password link */}
                    <Typography style={{ marginTop: '16px' }}>
                        <a href="/forgot_password" style={{ color: '#232f66', textDecoration: 'none' }}>
                            Mot de passe oublié ?
                        </a>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    );
};

export default Login;
