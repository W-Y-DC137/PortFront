// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { request } from '../../apis/axios_helper';
import Header from '../../components/Header';

const Profile = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({ nomUtilisateur: '', email: '' });
    const [editMode, setEditMode] = useState({ username: false, email: false });
    const [isChanged, setIsChanged] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });

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

    const handleChangePasswordClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    };

    const handlePasswordChange = (field) => (e) => {
        setPasswords({ ...passwords, [field]: e.target.value });
    };

    const handleSavePassword = async () => {
        try {
            await request('put', `/api/utilisateurs/${userId}/changer-mot-de-passe`, passwords);
            handleCloseDialog();
            alert("Password changed successfully");
        } catch (error) {
            console.error('Error changing password:', error);
            alert(error.response.data);
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
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleChangePasswordClick}
                    >
                        Changer mot de passe
                    </Button>
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Changer mot de passe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your current password and new password.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="Current Password"
                        type="password"
                        fullWidth
                        onChange={handlePasswordChange('currentPassword')}
                        value={passwords.currentPassword}
                    />
                    <TextField
                        margin="dense"
                        label="New Password"
                        type="password"
                        fullWidth
                        onChange={handlePasswordChange('newPassword')}
                        value={passwords.newPassword}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        onChange={handlePasswordChange('confirmNewPassword')}
                        value={passwords.confirmNewPassword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSavePassword} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Profile;
