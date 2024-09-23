'use client'

import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchAllGigs } from '@/app/redux/slice/gigSlice';
import { Grid, Card, CardContent, Typography, Avatar, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, Button } from '@mui/material';
import styled from 'styled-components';
import { Image } from 'antd';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/authContext';

const Container = styled.div`
  padding: 4rem;
  background-color: #f9f9f9;
`;

const GigCard = styled(Card)`
  max-width: 300px;
  margin: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

    .action-buttons {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const GigAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  margin-right: 1rem;
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;

const Description = styled(Typography)`
  margin-top: 1rem;
  color: #555;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const ActionButtons = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

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

const Home = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { role, user } = authContext;
  const dispatch = useAppDispatch();
  const { gigs, loading, error } = useAppSelector((state) => state.gigs);
  const router = useRouter();
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAllGigs());
  }, [dispatch]);

  const handleCategoryChange = useCallback((event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string);
  }, []);

  const handleCardClick = useCallback((userId: string) => {
    router.push(`/profile/${userId}`);
  }, [router]);

  const handleChatClick = useCallback((gigId: string) => {
    router.push(`/chat/${gigId}`);
  }, [router]);

  const handleCreateOrderClick = useCallback((gigId: string) => {
    router.push(`/createOrder/${gigId}`);
  }, [router]);

  const filteredGigs = useMemo(() =>
    category
      ? gigs.filter((gig) => gig.category === category)
      : gigs
    , [category, gigs]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <FilterContainer>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>Gigs</Typography>
        <FormControl>
          <InputLabel>Filter by Category</InputLabel>
          <StyledSelect
            value={category}
            onChange={handleCategoryChange}
            label="Filter by Category"
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </FilterContainer>

      <Grid container spacing={3}>
        {filteredGigs.map((gig) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={gig.id}>
            <GigCard>
              {gig.image && (
                <Image
                  width="100%"
                  height={200}
                  alt='Gig Image'
                  src={gig?.image as string}
                />
              )}
              <CardContent onClick={() => router.push(`/gigDetail/${gig.id}`)}>
                <CardContentWrapper>
                  <UserDetails>
                    <GigAvatar onClick={() => handleCardClick(gig.user.id)} src={gig.user?.profilePicture} alt={gig.user?.name} />
                    <div>
                      <Typography variant="h6">{gig.title}</Typography>
                      <Typography color="textSecondary">{gig.category}</Typography>
                      <Typography variant="body2" color="textSecondary">Owner: {gig.user?.name}</Typography>
                    </div>
                  </UserDetails>
                  <Description>
                    {gig.description && gig.description.length > 30
                      ? `${gig.description.substring(0, 20)}... `
                      : gig.description || 'No description available.'
                    }
                    {gig.description && gig.description.length > 30 && (
                      <Button
                        sx={{ textTransform: 'none', padding: 0 }}
                      >
                        Show More
                      </Button>
                    )}
                  </Description>


                </CardContentWrapper>
              </CardContent>

              {(role === 'Buyer' || user === gig?.user?.email) && <ActionButtons className="action-buttons">
                {role === 'Buyer' && (
                  <Button sx={{ backgroundColor: '#004225' }} variant="contained" onClick={() => handleCreateOrderClick(gig.id)}>Create Order</Button>
                )}
                <Button sx={{ backgroundColor: '#0bcee7', color: 'white' }} onClick={() => handleChatClick(gig.id)}>Chat</Button>
              </ActionButtons>}
            </GigCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
