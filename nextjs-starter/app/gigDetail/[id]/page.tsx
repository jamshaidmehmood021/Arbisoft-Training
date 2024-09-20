'use client';
import React, {useContext} from 'react';
import { Typography, Card, CardContent, Avatar, Button } from '@mui/material';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import {Image} from 'antd';

import { useAppSelector } from '@/app/redux/hooks';
import { selectGigById } from '@/app/redux/slice/gigSlice';
import { AuthContext } from '@/app/context/authContext';

const Container = styled.div`
  padding: 3rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const GigCard = styled(Card)`
  max-width: 900px;
  padding: 2.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: #fff;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
`;

const ImageContainer = styled.div`
  margin-left: 4.5rem;
`;
const Video = styled.video`
  max-width: 100%;
  border-radius: 12px;
  margin: 1.5rem 0;
  margin-left: 4.5rem;
  @media (min-width: 768px) {
    margin-right: 1.5rem;
    max-width: 50%;
  }
`;
const AvatarStyled = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
  border: 2px solid #0077ff;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    align-items: flex-start;
    margin-bottom: 0;
  }
`;

const Section = styled.div`
  margin: 2rem 0;
`;

const ActionButton = styled(Button)`
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #0077ff;
  color: #fff;
  border-radius: 8px;
  &:hover {
    background-color: #005bb5;
  }
`;

const GigDetails = ({ params }: { params: { id: string } }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { role } = authContext;

  const router = useRouter();
  const { id } = params;
  const gig: any | undefined = useAppSelector((state) => selectGigById(state, Number(id)));

  if (!gig) return <div>Gig not found</div>;

  const bufferToString = (buffer: { data: number[] }): string => {
    return String.fromCharCode(...buffer.data);
  };

  const videoUrl = gig.video && typeof gig.video === 'object' ? bufferToString(gig.video) : gig.video;

  return (
    <Container>
      <GigCard>
        <DetailsContainer>
          {gig.user && (
            <UserDetails>
              <AvatarStyled src={gig.user.profilePicture} alt={gig.user.name}
               onClick={() => router.push(`/profile/${gig.user.id}`)} 
               />
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {gig.user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {gig.user.email}
              </Typography>
            </UserDetails>
          )}

          <Section>
            {videoUrl && (
              <Video controls>
                <source src={videoUrl} type="video/mp4" />
              </Video>
            )}

           <ImageContainer>
            {gig.image && (
              <Image 
                src={gig.image as string} 
                alt="Gig Image"
                width={300}
                height={300}
              />
            )}
          </ImageContainer>
          </Section>
        </DetailsContainer>

        <CardContent>
          <Typography variant="h4" gutterBottom>{gig.title}</Typography>
          <Typography variant="h6" gutterBottom>Category: {gig.category}</Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {gig.description}
          </Typography>

          {role ==='Buyer' && 
              <ActionButton variant="contained" onClick={() => router.push(`/chat/${gig.id}`)}>
                Contact Seller
              </ActionButton>}
        </CardContent>
      </GigCard>
    </Container>
  );
};

export default GigDetails;
