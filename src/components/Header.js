import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Badge,
    Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomAvatar from './CustomAvatare'; // Import your CustomAvatar component
import { ref, onValue ,update} from 'firebase/database'; // Import Firebase Database functions
import { database } from '../firebase'; // Import database from your Firebase config

const Header = () => {
    // États pour les menus
    const [anchorElNavigation, setAnchorElNavigation] = useState(null);
    const [anchorElNotifications, setAnchorElNotifications] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0); // Compte des notifications non lues

    const navigate = useNavigate();
    const location = useLocation();
    const role = localStorage.getItem('role'); // Récupère le rôle depuis localStorage
    const username = localStorage.getItem('username'); // Récupère le nom d'utilisateur depuis localStorage

    // Écouteur pour les notifications (seulement pour les agents)
    useEffect(() => {
        if (role === 'AGENT') {
            const messagesRef = ref(database, 'tickets/');
            const unsubscribe = onValue(messagesRef, (snapshot) => {
                const tickets = snapshot.val();
                const newNotifications = [];
                let count = 0;

                if (tickets) {
                    Object.keys(tickets).forEach((ticketId) => {
                        const messages = tickets[ticketId].messages;
                        if (messages) {
                            Object.keys(messages).forEach((messageId) => {
                                const message = messages[messageId];
                                // Vérifie si le message est non lu et envoyé par un client
                                if (!message.read && message.sender !== username) {
                                    newNotifications.push({
                                        ticketId,
                                        messageId,  // Inclure l'ID du message
                                        message: `Vous avez un nouveau message concernant le ticket ${ticketId}`,
                                    });
                                    count += 1;
                                }
                                
                            });
                        }
                    });
                }

                setNotifications(newNotifications);
                setUnreadCount(count >= 0 ? count : 0);
            });

            return () => unsubscribe(); // Nettoie l'écouteur lors du démontage
        }
    }, [role, username]);

    // Gestionnaire pour ouvrir le menu de navigation
    const handleNavigationMenu = (event) => {
        setAnchorElNavigation(event.currentTarget);
    };

    // Gestionnaire pour ouvrir le menu des notifications
    const handleNotificationsMenu = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    // Gestionnaire pour fermer le menu de navigation
    const handleCloseNavigation = () => {
        setAnchorElNavigation(null);
    };

    // Gestionnaire pour fermer le menu des notifications
    const handleCloseNotifications = () => {
        setAnchorElNotifications(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username'); // Efface le nom d'utilisateur
        navigate('/login');
    };

    const navigateToHome = () => {
        switch (role) {
            case 'CLIENT':
                navigate('/client');
                break;
            case 'AGENT':
                navigate('/agent');
                break;
            case 'ADMIN':
                navigate('/admin');
                break;
            default:
                navigate('/login');
        }
    };

    // Vérifie si le chemin actuel est la page d'accueil
    const isHomePage = location.pathname === '/client' || location.pathname === '/agent' || location.pathname === '/admin';

    // Fonction pour gérer le clic sur une notification
    const handleNotificationClick = (ticketId, messageId) => {
        // Navigue vers la page du ticket
        navigate(`/ticket/${ticketId}`);
    
        // Marquer le message comme "lu" dans Firebase
        const messageRef = ref(database, `tickets/${ticketId}/messages/${messageId}`);
        update(messageRef, { read: true });
    
        // Mettre à jour le compteur des notifications non lues
        setUnreadCount(prevCount => prevCount - 1);
    
        // Supprimer la notification de la liste locale
        setNotifications(prevNotifications =>
            prevNotifications.filter(notification => notification.messageId !== messageId)
        );
    
        // Fermer le menu des notifications
        handleCloseNotifications();
    };
    
    

    return (
<<<<<<< HEAD
        <AppBar position="static" sx={{ backgroundColor: '#232f66' }}>
            <Toolbar>
                {/* Menu pour la navigation */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleNavigationMenu}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Menu
                </Typography>

                {/* Bouton "Accueil" conditionnel */}
                {!isHomePage && (
                    <Button
                        edge="end"
                        color="inherit"
                        aria-label="Accueil"
                        onClick={navigateToHome}
                        style={{ marginLeft: 'auto' }}
                        sx={{ textTransform: 'none', cursor: 'pointer' }} // Désactive les majuscules et assure un curseur pointer
                    >
                        <Typography variant="h6" sx={{ cursor: 'pointer' }}>
                            Accueil
                        </Typography>
                    </Button>
                )}

                {/* Icône de notifications pour les agents */}
                {role === 'AGENT' && (
                    <IconButton color="inherit" onClick={handleNotificationsMenu}>
                        <Badge badgeContent={unreadCount} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                )}

                {/* Avatar personnalisé avec nom d'utilisateur */}
                {username && (
                    <CustomAvatar name={username} />
                )}
=======
        <AppBar position="static" style={{ backgroundColor: '#232f66' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    PORTClaim
                </Typography>
                <Button color="inherit" onClick={navigateToHome}>
                    Home
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => navigate('/employee/profile')}>Profile</MenuItem>
                    {role === 'CLIENT' && (
                        <>
                            <MenuItem onClick={() => navigate('/client/create-ticket')}>Créer un ticket</MenuItem>
                            <MenuItem onClick={() => navigate('/client/tickets')}>Suivre mes tickets</MenuItem>
                        </>
                    )}
                    {role === 'AGENT' && (
                        <MenuItem onClick={() => navigate('/agent/tickets')}>Liste des tickets</MenuItem>
                    )}
                    {role === 'ADMIN' && (
                        <>
                            <MenuItem onClick={() => navigate('/admin/tickets')}>Liste des tickets</MenuItem>
                            <MenuItem onClick={() => navigate('/admin/users')}>Liste des utilisateurs</MenuItem>
                        </>
                    )}
                    <MenuItem onClick={handleLogout}>Sortir</MenuItem>
                </Menu>
>>>>>>> 013da6acc733bb923b46f79b8f6d9bf36a9dd9d6
            </Toolbar>

            {/* Menu des notifications */}
            <Menu
                anchorEl={anchorElNotifications}
                open={Boolean(anchorElNotifications)}
                onClose={handleCloseNotifications}
                PaperProps={{
                    style: {
                        width: '500px', // Ajustez la largeur selon vos besoins
                        backgroundColor: '#fff', // Couleur de fond
                        color: '#000', // Couleur du texte
                    },
                }}
            >
                {notifications.length > 0 ? (
                   notifications.map((notification, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleNotificationClick(notification.ticketId, notification.messageId)}
                    >
                        {notification.message}
                    </MenuItem>
                ))
                ) : (
                    <MenuItem onClick={handleCloseNotifications}>
                        Aucune nouvelle notification
                    </MenuItem>
                )}
            </Menu>

            {/* Menu de navigation */}
            <Menu
                anchorEl={anchorElNavigation}
                open={Boolean(anchorElNavigation)}
                onClose={handleCloseNavigation}
                PaperProps={{
                    style: {
                        width: '200px', // Ajustez la largeur selon vos besoins
                        backgroundColor: '#232f66', // Couleur de fond
                        color: '#fff', // Couleur du texte
                    },
                }}
            >
                <MenuItem
                    onClick={() => { navigate('/employee/profile'); handleCloseNavigation(); }}
                    sx={{
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#3f51b5', // Couleur plus claire au survol
                        },
                    }}
                >
                    Profile
                </MenuItem>
                {role === 'CLIENT' && [
                    <MenuItem
                        key="create-ticket"
                        onClick={() => { navigate('/client/create-ticket'); handleCloseNavigation(); }}
                        sx={{
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#3f51b5',
                            },
                        }}
                    >
                        Créer un ticket
                    </MenuItem>,
                    <MenuItem
                        key="follow-tickets"
                        onClick={() => { navigate('/client/tickets'); handleCloseNavigation(); }}
                        sx={{
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#3f51b5',
                            },
                        }}
                    >
                        Suivre mes tickets
                    </MenuItem>
                ]}
                {role === 'AGENT' && (
                    <MenuItem
                        key="agent-tickets"
                        onClick={() => { navigate('/agent/tickets'); handleCloseNavigation(); }}
                        sx={{
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#3f51b5',
                            },
                        }}
                    >
                        Liste des tickets
                    </MenuItem>
                )}
                {role === 'ADMIN' && [
                    <MenuItem
                        key="admin-tickets"
                        onClick={() => { navigate('/users/adding'); handleCloseNavigation(); }}
                        sx={{
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#3f51b5',
                            },
                        }}
                    >
                        Ajouter les utilisateurs
                    </MenuItem>,
                    <MenuItem
                        key="admin-users"
                        onClick={() => { navigate('/admin/users'); handleCloseNavigation(); }}
                        sx={{
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#3f51b5',
                            },
                        }}
                    >
                        Liste des utilisateurs
                    </MenuItem>
                ]}
                <MenuItem
                    onClick={() => { handleLogout(); handleCloseNavigation(); }}
                    sx={{
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#3f51b5',
                        },
                    }}
                >
                    Sortir
                </MenuItem>
            </Menu>
        </AppBar>
    );
};

export default Header;
