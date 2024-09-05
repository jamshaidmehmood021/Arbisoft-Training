import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Import the date adapter
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      width: '100%',
      padding: theme.spacing(4),
      gap: theme.spacing(3),
      margin: 'auto',
      maxWidth: '450px',
      borderRadius: theme.shape.borderRadius * 2,
      boxShadow: theme.shadows[5],
    },
    addPostContainer: {
      height: '100vh',
      padding: theme.spacing(4),
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    addPostTitle: {
      width: '100%',
      textAlign: 'center',
      fontSize: 'clamp(2rem, 5vw, 2.5rem)',
      marginBottom: theme.spacing(2),
    },
    textField: {
      marginBottom: theme.spacing(1),
    },
    addPostButton: {
      borderRadius: theme.shape.borderRadius * 2,
      fontWeight: 'bold',
      padding: theme.spacing(1.5),
    },
    link: {
      fontWeight: 'bold',
    },
    divider: {
      margin: theme.spacing(3, 0),
    },
  }));

export default function AddPost() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    caption: '',
    date: null,
    description: '',
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, date: newDate });
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Post submitted:', formData);
    navigate('/home');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack className={classes.addPostContainer}>
        <Card variant="outlined" className={classes.card}>
          <Typography component="h1" variant="h4" className={classes.addPostTitle}>
            New Post
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="caption">Caption</FormLabel>
              <TextField
                id="caption"
                name="caption"
                placeholder="Enter a catchy caption"
                required
                fullWidth
                value={formData.caption}
                onChange={handleInputChange}
                variant="outlined"
                className={classes.textField}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="date">Date</FormLabel>
              <DatePicker
                id="date"
                label="Post Date"
                value={formData.date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                id="description"
                name="description"
                placeholder="Write something about your post"
                multiline
                rows={4}
                required
                fullWidth
                value={formData.description}
                onChange={handleInputChange}
                variant="outlined"
                className={classes.textField}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="image">Upload Image</FormLabel>
              <TextField
                id="image"
                name="image"
                type="file"
                inputProps={{ accept: 'image/*' }}
                fullWidth
                onChange={handleImageChange}
                variant="outlined"
                className={classes.textField}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.addPostButton}
            >
              Add Post
            </Button>
          </Box>

          <Divider className={classes.divider} />

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/home')}
            className={classes.addPostButton}
          >
            Cancel
          </Button>
        </Card>
      </Stack>
    </LocalizationProvider>
  );
}
