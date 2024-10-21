import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation to access URL params
import { Button, TextField, Grid, Paper, Typography } from "@mui/material";
import { request } from "../apis/axios_helper";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
    // Use useLocation to access the token from the URL
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token'); // Get the token from URL

    const handleResetPassword = async (event) => {
        event.preventDefault();

        // Ensure token exists
        if (!token) {
            setMessage("Invalid or missing token.");
            return;
        }

        try {
            const response = await request('post', `/api/utilisateurs/reset_password?token=${token}`, { password });
            setMessage(response.data);
        } catch (error) {
            console.error("Error resetting password", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <Grid>
            <Typography style={{ marginBottom: '16px', fontSize: '24px', textAlign: 'center' }}>
                Réinitialiser le mot de passe
            </Typography>
            <Paper elevation={10} style={{ padding: 20, height: '30vh', width: 300, margin: "20px auto" }}>
                <Grid align='center'>
                    <h2>Entrez votre nouveau mot de passe</h2>
                </Grid>
                <form onSubmit={handleResetPassword}>
                    <TextField 
                        label="Nouveau mot de passe" 
                        placeholder="Entrer votre nouveau mot de passe" 
                        variant="outlined" 
                        fullWidth 
                        style={{ marginBottom: '16px' }} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                        type="submit" 
                        style={{ backgroundColor: '#232f66', color: '#ffffff' }} 
                        fullWidth
                    >
                        Rénitialiser le mot de passe
                    </Button>
                </form>
                {message && <Typography style={{ marginTop: '16px', textAlign: 'center' }}>{message}</Typography>}
            </Paper>
        </Grid>
    );
};

export default ResetPassword;
