import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate , useLocation } from 'react-router-dom';
import { getAuth, signInWithCustomToken } from 'firebase/auth'; 
import LockIcon from '@mui/icons-material/Lock';
import PortLogo from './images/PortLogo.png';
import { request } from "../apis/axios_helper";
<<<<<<< HEAD
import axios from "axios";
=======
import backgroundVideo from './images/background.mp4'; // Ensure this path is correct
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
<<<<<<< HEAD
    const [error, setError] = useState(''); // State for managing error messages
    const navigate = useNavigate();
    const location = useLocation();
=======
    const navigate = useNavigate();
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors
        try {
            const response = await request('post', '/api/auth/authenticate', { username, password });
<<<<<<< HEAD
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


=======
            const { token } = response.data;
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6
    
    
            

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
<<<<<<< HEAD
    } catch (error) {
        console.error('Login failed', error);
        setError("Nom d'utilisateur ou mot de passe incorrect");
    }
};
    
=======
    };
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6

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
<<<<<<< HEAD
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
=======
            </Grid>
        </div>
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6
    );
};

export default Login;
