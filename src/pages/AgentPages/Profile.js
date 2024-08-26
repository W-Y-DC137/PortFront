// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { request } from '../../apis/axios_helper';
import Header from '../../components/Header';

const Profile = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({ nomUtilisateur: '', email: '' });
    const [editMode, setEditMode] = useState({ username: false, email: false });
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await request('get', `/api/utilisateurs/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleInputChange = (field) => (e) => {
        setUser({ ...user, [field]: e.target.value });
        setIsChanged(true);
    };

    const handleEditClick = (field) => () => {
        setEditMode({ ...editMode, [field]: !editMode[field] });
    };

    const handleSave = async () => {
        try {
            await request('put', `/api/utilisateurs/${userId}`, user);
            setEditMode({ username: false, email: false });
            setIsChanged(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div>
            <Header/>
        <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
                <h1>Welcome to Profile Page</h1>
            </Grid>
            <Grid item>
                <TextField
                    label="Username"
                    value={user.nomUtilisateur}
                    onChange={handleInputChange('nomUtilisateur')}
                    disabled={!editMode.username}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleEditClick('username')}>
                                <EditIcon />
                            </IconButton>
                        ),
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Email"
                    value={user.email}
                    onChange={handleInputChange('email')}
                    disabled={!editMode.email}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleEditClick('email')}>
                                <EditIcon />
                            </IconButton>
                        ),
                    }}
                />
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={!isChanged}
                >
                    Enregistrer
                </Button>
            </Grid>
        </Grid>
        </div>
    );
};

export default Profile;
