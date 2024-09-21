'use client';
import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

import { FacebookIcon, GoogleIcon } from '@/app/muiCustomIcons/CustomIcons';

import useAuth from '@/app/hook/useAuth';
import Image from 'next/image';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  profilePicture: File | string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    role: '',
    profilePicture: ''
  });
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const { apiCall, loading } = useAuth();
  const router = useRouter();

  const currentTab = 1; 

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(newValue === 0 ? '/signIn' : '/signUp');
  };

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  }, []);

  const handleRoleChange = useCallback((e: SelectChangeEvent<string>) => {
    setFormData(prevData => ({ ...prevData, role: e.target.value }));
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prevData => ({ ...prevData, profilePicture: file }));
      const previewUrl = URL.createObjectURL(file); 
      setImagePreview(previewUrl); 
    }
  }, []);  
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.profilePicture) {
      setError('All fields are required');
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('profilePicture', formData.profilePicture);
  
    const response = await apiCall('http://localhost:5000/signUP', formDataToSend, 'POST');
  
    if (response?.error) {
      setError(response.error || 'Sign Up failed');
      toast.error(`Sign Up Error: ${response.error}`);
      return;
    }
  
    toast.success('Sign Up successful!');
    setFormData({ name: '', email: '', password: '', role: '', profilePicture: '' });
    setImagePreview(null); 
    setError('');
  
    router.push('/signIn');
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', padding: 2 }}>
      <Paper elevation={6} sx={{ padding: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>
          <Tabs value={currentTab} onChange={handleTabChange} centered textColor="primary">
            <Tab label="Sign In" sx={{
              '&.Mui-selected': { color: 'black', fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'monospace' },
              '&:hover': { backgroundColor: '#f7f9fc' }
            }} />
            <Tab label="Sign Up" sx={{
              '&.Mui-selected': { color: 'black', fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'monospace' },
              '&:hover': { backgroundColor: '#f7f9fc' }
            }} />
         </Tabs> 
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography variant="body2" color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              type="email"
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              variant="outlined"
              type="password"
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                label="Role"
                required
              >
                <MenuItem value="Seller">Seller</MenuItem>
                <MenuItem value="Buyer">Buyer</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 3 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="profilePicture"
            />
            <label htmlFor="profilePicture">
              <Button
                component="span"
                variant="outlined"
                fullWidth
              >
                Upload Profile Picture
              </Button>
            </label>
            {imagePreview && ( 
              <Box sx={{ mt: 2 }}>
                <Image
                  src={imagePreview}
                  alt="Profile Preview"
                  width={100} 
                  height={100}
                  style={{ borderRadius: '4px', objectFit: 'cover' }}
                />
              </Box>
            )}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5 }}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account? <Button href="/signIn" variant="text">Log in</Button>
        </Typography>
        <Divider sx={{ my: 3 }}>or</Divider>
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
