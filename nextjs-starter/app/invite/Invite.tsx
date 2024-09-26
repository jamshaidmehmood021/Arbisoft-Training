import React, { useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    Paper,
    Snackbar,
    Alert,
} from '@mui/material';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const StyledPaper = styled(Paper)`
    padding: 30px;
    max-width: 500px;
    margin: 50px auto;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    background-color: white;
`;

const Container = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 50%, #ff6a00 100%);
    background-size: 300% 300%;
    animation: gradient-animation 5s ease infinite;

    @keyframes gradient-animation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;

const StyledButton = styled(Button)`
    && {
        margin-top: 20px;
        background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
        color: white;
        &:hover {
            background: linear-gradient(45deg, #2575fc 0%, #6a11cb 100%);
        }
    }
`;

const Invite = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSendInvite = async () => {
        if (email && message) {
            try {
                const serverID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVER_ID || '';
                const templateID = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID || '';
                const publicKey = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY || '';

                await emailjs.send(serverID, templateID, {
                    user_email: email,
                    message: message,
                }, publicKey);

                setSnackbarMessage('Invite sent successfully!');
                toast.success('Invite sent successfully!');
                setOpenSnackbar(true);
                setEmail('');
                setMessage('');
            } catch (error) {
                console.error('Failed to send invite:', error);
                setSnackbarMessage('Failed to send invite.');
                setOpenSnackbar(true);
            }
        } else {
            setSnackbarMessage('Please fill in all fields.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container>
            <StyledPaper>
                <Typography variant="h5" gutterBottom align="center">
                    Invite User
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <StyledButton
                    variant="contained"
                    fullWidth
                    onClick={handleSendInvite}
                >
                    Send Invite
                </StyledButton>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </StyledPaper>
        </Container>
    );
};

export default Invite;
