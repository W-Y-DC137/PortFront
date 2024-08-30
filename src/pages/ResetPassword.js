import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { request } from '../apis/axios_helper';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await request('post', '/api/auth/reset_password', null, { token, password });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response?.data || 'An error occurred.');
        }
    };

    return (
        <Grid>
            <Paper elevation={10} style={{ padding: 20, height: '30vh', width: 300, margin: "20px auto" }}>
                <Grid align='center'>
                    <h2>Reset Password</h2>
                </Grid>
                <form onSubmit={handleResetPassword}>
                    <TextField
                        label="New Password"
                        type="password"
                        placeholder="Enter your new password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ marginBottom: '16px' }}
                    />
                    <Button 
                        type="submit" 
                        style={{ backgroundColor: '#232f66', color: '#ffffff' }} 
                        fullWidth
                    >
                        Reset Password
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

export default ResetPassword;
