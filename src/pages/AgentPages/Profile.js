import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { request } from '../../apis/axios_helper';
import Header from '../../components/Header';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import CustomAvatar from '../../components/CustomAvatare'; // Ensure the correct path

const Profile = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({ nomUtilisateur: '', email: '' });
    const [editMode, setEditMode] = useState({ username: false, email: false });
    const [isChanged, setIsChanged] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state

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
            setSnackbarOpen(true); // Show success message
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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Header />
            <BreadcrumbsComponent/>
            <Box
                sx={{
                    maxWidth: '600px',
                    margin: 'auto',
                    padding: '20px',
                    border: '2px solid #232f66',
                    marginTop: '60px',
                    borderRadius: '8px',
                    textAlign: 'center', // Center content horizontally
                }}
            >
                <h1>Mon Profile</h1>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', // Center avatar horizontally
                        marginBottom: '20px',
                    }}
                >
                    <CustomAvatar name={user.nomUtilisateur} />
                </Box>
                <TextField
                    label="Nom d'utilisateur"
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
                    fullWidth
                />
                <TextField
                    style={{ marginTop: '16px' }}
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
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleChangePasswordClick}
                    sx={{ marginTop: '20px', backgroundColor: '#232f66' }} // Custom color
                >
                    Changer le mot de passe
                </Button>
                <Box
                    sx={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px', // Space between buttons
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={!isChanged}
                    >
                        Enregistrer
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => window.history.back()} // Go back to the previous page
                    >
                        Annuler
                    </Button>
                </Box>
            </Box>

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

            {/* Snackbar for success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Mise à jour réussie !
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Profile;
