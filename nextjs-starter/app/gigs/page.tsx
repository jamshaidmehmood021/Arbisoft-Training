'use client';
import React, { useState, useCallback, useContext } from 'react';
import { TextField, Button, MenuItem, InputLabel, Select, FormControl, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppDispatch } from '@/app/redux/store';
import { createGig } from '@/app/redux/slice/gigSlice';
import { AuthContext } from '@/app/context/authContext';
import TextEditor from '@/app/components/TextEditor';

import withAuth from '@/app/components/ProtectedRoute';

const PageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f0f0f0',
  padding: '10px',
});

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '500px',
  padding: '30px',
  borderRadius: '10px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledButton = styled(Button)({
  backgroundColor: '#4caf50',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#45a049',
  },
  marginBottom: '16px',
});

const Title = styled('h2')({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '20px',
});

const categories = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Web Development',
  'Mobile Development',
  'Cloud Computing',
  'DevOps',
  'Cybersecurity',
  'Blockchain',
];

const GigForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { token } = authContext;
  const [gigTitle, setGigTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState(''); // State for description
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleVideoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', gigTitle);
    formData.append('category', category);
    formData.append('description', description); // Add description to formData
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (videoFile) {
      formData.append('video', videoFile);
    }

    const response = await dispatch(createGig(formData));
    if (response.payload.message === 'Gig created successfully') {
      toast.success(response.payload.message);
      setLoading(false);
      router.push('/home');
    } else {
      toast.error('Gig creation failed');
      setLoading(false);
    }
  }, [dispatch, gigTitle, category, description, imageFile, videoFile, router]);

  return (
    <PageContainer>
      <FormContainer>
        <Title>Create a Gig</Title>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Gig Title"
            value={gigTitle}
            onChange={(e) => setGigTitle(e.target.value)}
            margin="normal"
            sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
          />

          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextEditor
            value={description} 
            setValue={setDescription} 
            placeholder="Enter the gig description here..."
            type="Gig"
          />

          <div style={{ marginTop: '20px' }}>
            <label htmlFor="image-upload">
              <StyledButton variant="contained" component="span" fullWidth>
                Upload Image
              </StyledButton>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {imagePreview && (
            <Box sx={{ mt: 2, mb: 3 }}>
              <Image src={imagePreview} alt="Image Preview" width={300} height={300} />
            </Box>
          )}

          <label htmlFor="video-upload">
            <StyledButton variant="contained" component="span" fullWidth>
              Upload Video (Optional)
            </StyledButton>
            <input
              type="file"
              id="video-upload"
              accept="video/*"
              hidden
              onChange={handleVideoUpload}
            />
          </label>

          {videoPreview && (
            <Box sx={{ mt: 2, mb: 3 }}>
              <video
                controls
                src={videoPreview}
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
              />
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: '#007bff',
              '&:hover': { backgroundColor: '#0069d9' },
              fontWeight: 'bold',
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Gig'}
          </Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default withAuth(GigForm);
