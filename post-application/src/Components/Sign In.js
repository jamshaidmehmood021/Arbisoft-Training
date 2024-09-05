import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import { Button, Checkbox, FormControlLabel, Divider, FormLabel, FormControl, TextField, Typography, Stack, Card } from '@mui/material';
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
    gap: theme.spacing(3),
    margin: 'auto',
    maxWidth: '450px',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[5],
  },
  signInContainer: {
    height: '100vh',
    padding: theme.spacing(4),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  signInTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
  signInButton: {
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
  socialButton: {
    borderRadius: theme.shape.borderRadius * 2,
    fontWeight: 'bold',
    padding: theme.spacing(1.5),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { emailError, emailErrorMessage, passwordError, passwordErrorMessage, handleSubmit } = useAuth('login');

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    const response = await handleSubmit(formData);

    if (response && response.token) {
      navigate('/home');
    }
  };

  return (
    <Stack className={classes.signInContainer}>
      <Card variant="outlined" className={classes.card}>
        <Typography component="h1" variant="h4" className={classes.signInTitle}>
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
              className={classes.textField}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
              className={classes.textField}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{ marginBottom: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.signInButton}
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
            Don&apos;t have an account?{' '}
            <Link to="/" className={classes.link}>
              Sign up
            </Link>
          </Typography>
        </Box>
        <Divider className={classes.divider}>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign in with Google')}
            startIcon={<GoogleIcon />}
            className={classes.socialButton}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign in with Facebook')}
            startIcon={<FacebookIcon />}
            className={classes.socialButton}
          >
            Sign in with Facebook
          </Button>
        </Box>
      </Card>
    </Stack>
  )
}

export default SignIn;
