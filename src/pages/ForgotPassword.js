import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { request } from '../apis/axios_helper';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log('Forgot password form submitted'); // Add this line
    try {
        const response = await request('post', '/api/utilisateurs/forgot_password', null, { email });
        console.log('Response:', response); // Add this line
        setMessage(response.data);
    } catch (error) {
        console.error('Error:', error); // Add this line
        setMessage(error.response?.data || 'An error occurred.');
    }
};
    
    

    return (
        <Grid>
            <Paper elevation={10} style={{ padding: 20, height: '30vh', width: 300, margin: "20px auto" }}>
                <Grid align='center'>
                    <h2>Forgot Password</h2>
                </Grid>
                <form onSubmit={handleForgotPassword}>
                    <TextField
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ marginBottom: '16px' }}
                    />
                    <Button 
                        type="submit" 
                        style={{ backgroundColor: '#232f66', color: '#ffffff' }} 
                        fullWidth
                    >
                        Send Reset Link
                    </Button>
                </form>
                {message && (
                    <Typography style={{ marginTop: '16px', textAlign: 'center' }}>
                        {message}
                    </Typography>
                )}
            </Paper>
        </Grid>
    );
};

export default ForgotPassword;
