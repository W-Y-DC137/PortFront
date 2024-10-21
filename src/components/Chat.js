import React, { useState, useEffect, useRef } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketDetailsRequest, fetchTicketAttachmentsRequest } from '../actions/ticketActions';
import { useParams } from 'react-router-dom';
import { storage, database } from '../firebase'; // Ensure Firebase storage is imported
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary functions for file upload
import { Box, TextField, Button, Typography, Paper, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // To show an attachment icon
import axios from 'axios';

const Chat = ({ ticketId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null); // State for selected file
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null); // Reference for the end of the message list

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('userRole'); 
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const messagesRef = ref(database, `tickets/${ticketId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        setMessages(Object.values(messagesData));
      }
    });

    return () => unsubscribe();
  }, [ticketId]);

 // Handle sending message with attachment
 const handleSendMessage = async () => {
    if ((newMessage.trim() !== '' || file) && username) {
      let fileUrl = null;
      let fileName = null;
      console.log('Selected file:', file);
      // If there is a file, upload it to Firebase Storage
      if (file) {
        const fileRef = storageRef(storage, `attachments/${file.name}-${Date.now()}`);
        await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(fileRef);
        fileName = file.name; // Get the file name
      }

      // Create message object with or without file
      const message = {
        text: newMessage,
        timestamp: new Date().toISOString(),
        sender: username,
        attachmentUrl: fileUrl || null, // Include file URL if available
        attachmentName: fileName || null, // Include file name if available
      };

      // Push message to Firebase Database
      const messagesRef = ref(database, `tickets/${ticketId}/messages`);
      push(messagesRef, message);

      try {
        const response = await axios.get(`http://localhost:8080/api/tickets/${ticketId}`);
        const ticketDetails = response.data;

        await axios.post(`http://localhost:8080/api/tickets/${ticketId}/notify-client-message`, {
            clientId: ticketDetails.idClientDto,
        });
        console.log('Email envoyé avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email', error);
    }

      const userRole = localStorage.getItem('role');
      const status = userRole === 'CLIENT' ? 'Affecte' : 'En_Attente'; 
      await updateFullTicket(ticketId, status);

      // Reset message and file states
      setNewMessage('');
      setFile(null);
    }
  };

  // Fonction pour mettre à jour le statut du ticket
 // Function to fetch full ticket and update status
const updateFullTicket = async (ticketId, newStatus) => {
    try {
        // Fetch the full ticket details first (you can skip this if you already have the details in the state)
        const response = await axios.get(`http://localhost:8080/api/tickets/${ticketId}`);
        const ticketDetails = response.data;

        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('No user ID found in local storage');
            return;
        }

        // Construct the updated ticket object with all fields
        const updatedTicket = {
            ...ticketDetails,  // Keep all existing fields intact
            statusDto: newStatus,  // Update the status to the new value
        };

        // Send the full ticket object with the updated status
        await axios.put(`http://localhost:8080/api/tickets/${ticketId}`, updatedTicket);

        // Optionally refetch the ticket details to reflect status change
        dispatch(fetchTicketDetailsRequest(ticketId));

    } catch (error) {
        console.error('Error updating ticket', error);
    }
};

  // Handle the "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Scroll to the bottom of the message list
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Automatically scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '70vh',
        width: '90%',
        maxWidth: 600,
        margin: '0 auto',
        border: '4px solid #232f66',
        borderRadius: 2,
        padding: 2,
        backgroundColor: 'rgba(224, 224, 224, 1)',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: 2,
        }}
      >
        {messages.map((message, index) => {
          const isSentByCurrentUser = message.sender === username;
          return (
            <Paper
              key={index}
              elevation={1}
              sx={{
                marginBottom: 1,
                padding: 1,
                backgroundColor: isSentByCurrentUser ? '#9c27b0' : 'bleu',
                color: isSentByCurrentUser ? 'white' : 'black', // Text color for sent messages
                alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
              }}
            >
              <Typography variant="body2">
                {new Date(message.timestamp).toLocaleTimeString()}
              </Typography>
              <Typography variant="body1">{message.text}</Typography>
              {message.attachmentUrl && (
                <a href={message.attachmentUrl} target="_blank" rel="noopener noreferrer">
                  {message.attachmentName} {/* Display file name */}
                </a>
              )}
            </Paper>
          );
        })}
        {/* Add a div to mark the end of the messages */}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Add keydown event listener
          placeholder="Ecrire un message..."
          size="small"
        />
        {/* Display selected file name before sending */}
        {file && (
          <Typography variant="body2" sx={{ color: '#232f66' }}>
            Selected attachment: {file.name}
          </Typography>
        )}
        {/* File attachment input */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <IconButton color="primary" component="span">
            <AttachFileIcon />
          </IconButton>
        </label>
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{
            backgroundColor: '#232f66',
            '&:hover': {
              backgroundColor: '#1e2858',
            },
          }}
        >
          Envoyer
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
