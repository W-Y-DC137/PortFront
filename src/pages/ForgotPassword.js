import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { request } from "../apis/axios_helper";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        try {
            // Pass the email as a query parameter in the URL
            const response = await request('post', `/api/utilisateurs/forgot_password?email=${email}`);
            setMessage(response.data);
        } catch (error) {
            console.error("Error in forgot password", error);
            setMessage("Une erreur est survenue. Veuillez vérifier votre email.");
        }
    };
    

    return (
        <Grid>
            <Typography style={{ marginBottom: '16px', fontSize: '24px', textAlign: 'center' }}>
                Mot de passe oublié ?
            </Typography>
            <Paper elevation={10} style={{ padding: 20, height: '30vh', width: 300, margin: "20px auto" }}>
                <Grid align='center'>
                    <h2>Réinitialiser le mot de passe</h2>
                </Grid>
                <form onSubmit={handleForgotPassword}>
                    <TextField 
                        label="Email" 
                        placeholder="Entrer votre email" 
                        variant="outlined" 
                        fullWidth 
                        style={{ marginBottom: '16px' }} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button 
                        type="submit" 
                        style={{ backgroundColor: '#232f66', color: '#ffffff' }} 
                        fullWidth
                    >
                        Envoyer le lien de réinitialisation
                    </Button>
                </form>
                {message && <Typography style={{ marginTop: '16px', textAlign: 'center' }}>{message}</Typography>}
            </Paper>
        </Grid>
    );
};

export default ForgotPassword;
