'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, InputLabel, Select, FormControl, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { selectGigById } from '@/app/redux/slice/gigSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { updateGig } from '@/app/redux/slice/gigSlice';
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

const VideoInput = styled('input')({
  display: 'none',
});

const EditGigForm = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [gigTitle, setGigTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { id } = params;
  const gig = useAppSelector((state) => selectGigById(state, Number(id)));

  useEffect(() => {
    if (gig) {
      setGigTitle(gig.title);
      setCategory(gig.category);
      setDescription(gig.description);
      if (gig.image) setImagePreview(gig.image);
      if (gig.video) setVideoPreview(gig.video);
    }
  }, [gig]);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', gigTitle);
    formData.append('category', category);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (videoFile) {
      formData.append('video', videoFile);
    }

    const response = await dispatch(updateGig({ id: Number(id), formData: formData }));

    if (response.payload.message === "Gig updated successfully") {
      toast.success('Gig updated successfully');
      router.push('/home');
    } else {
      toast.error('Gig update failed');
    }

    setLoading(false);
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Edit Gig</Title>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Gig Title"
            value={gigTitle}
            onChange={(e) => setGigTitle(e.target.value)}
            margin="normal"
            sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
          />

          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
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

          {imagePreview && (
            <Box sx={{ mt: 2, mb: 3 }}>
              <Image
                src={imagePreview}
                alt="Image Preview"
                width={300}
                height={300}
              />
            </Box>
          )}

          <label htmlFor="video-upload">
            <StyledButton variant="contained" component="span" fullWidth>
              Upload Video (Optional)
            </StyledButton>
            <VideoInput
              type="file"
              id="video-upload"
              accept="video/*"
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
              position: 'relative',
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  color: '#fff',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            ) : (
              'Update Gig'
            )}
          </Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default withAuth(EditGigForm);
