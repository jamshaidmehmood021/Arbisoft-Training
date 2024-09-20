'use client';
import { useState, ChangeEvent, FormEvent, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import { FacebookIcon, GoogleIcon } from '@/app/muiCustomIcons/CustomIcons';

import useAuth from '@/app/hook/useAuth';
import { AuthContext } from '@/app/context/authContext';

interface SignInFormData {
  email: string;
  password: string;
}

interface DecodedToken {
  email: string;
  name: string;
  id: string;
  role: string;
}

export default function SignIn() {
  const authContext = useContext(AuthContext);
  const { setUser, setName, setUserID, setToken, setRole } = authContext!;
  const [formData, setFormData] = useState<SignInFormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const { apiCall, loading } = useAuth();
  const router = useRouter();
  const currentTab = 0; 

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(newValue === 0 ? '/signIn' : '/signUp');
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    try {
      const response = await apiCall('http://localhost:5000/login', formData);
      if (response?.error) throw new Error(response.error);
      if (response?.data?.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        setToken(token);
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUser(decodedToken.email);
        setName(decodedToken.name);
        setUserID(decodedToken.id);
        setRole(decodedToken.role);
        toast.success('Login successful!');
        setFormData({ email: '', password: '' });
        setError('');
        router.push('/home');
      }
    } catch (error: any) {
      setError(error.message || 'Login failed');
      toast.error(`Login Error: ${error.message}`);
    }
  }, [formData, apiCall, router, setUser, setName, setUserID, setToken, setRole]);

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', padding: 2 }}>
      <Paper elevation={6} sx={{ padding: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>
        <Tabs value={currentTab} onChange={handleTabChange} centered textColor="primary">
            <Tab label="Sign In" sx={{
              '&.Mui-selected': {color: 'black', fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'monospace'},
              '&:hover': {backgroundColor: '#f7f9fc'}
            }} />
            <Tab label="Sign Up" sx={{
             '&.Mui-selected': {color: 'black', fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'monospace'},
             '&:hover': {backgroundColor: '#f7f9fc'}
            }} />
         </Tabs>   
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        {error && <Typography variant="body2" color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Don’t have an account? <Link href="/signUp">Sign up</Link>
        </Typography>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign in with Google')}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign in with Facebook')}
            startIcon={<FacebookIcon />}
          >
            Sign in with Facebook
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
