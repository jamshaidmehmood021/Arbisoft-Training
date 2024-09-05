import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';

import { GoogleIcon, FacebookIcon } from 'MUICustomIcons/CustomIcons';
import useAuth from 'Hook/useAuth';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.up('sm')]: {
      width: '450px',
    },
  },
  signUpContainer: {
    height: '100vh',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    fontSize: 'clamp(2rem, 10vw, 2.15rem)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  button: {
    borderRadius: theme.shape.borderRadius,
    fontWeight: 'bold',
  },
  dividerText: {
    color: theme.palette.text.secondary,
  },
  socialButton: {
    borderRadius: theme.shape.borderRadius,
    fontWeight: 'bold',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { emailError, emailErrorMessage, passwordError, passwordErrorMessage, nameError, nameErrorMessage, handleSubmit } = useAuth('signup');

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    };
    const response = await handleSubmit(formData);

    if (response && response.error === null) {
      navigate('/signIn');
    }
  };

  return (
    <Stack className={classes.signUpContainer}>
      <MuiCard className={classes.card} variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          className={classes.title}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          className={classes.form}
        >
          <FormControl>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              placeholder="Jon Snow"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? 'error' : 'primary'}
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={emailError}
              helperText={emailErrorMessage}
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
          >
            Sign up
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/signIn" style={{ fontWeight: 'bold' }}>
              Sign in
            </Link>
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }}>
          <Typography className={classes.dividerText}>or</Typography>
        </Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign up with Google')}
            startIcon={<GoogleIcon />}
            className={classes.socialButton}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign up with Facebook')}
            startIcon={<FacebookIcon />}
            className={classes.socialButton}
          >
            Sign up with Facebook
          </Button>
        </Box>
      </MuiCard>
    </Stack>
  );
}
