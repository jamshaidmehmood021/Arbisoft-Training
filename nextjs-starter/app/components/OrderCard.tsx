import React, { useEffect, useState, useCallback, useContext } from 'react';
import {Typography, Card, CardContent, Button } from '@mui/material';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { useAppDispatch } from '@/app/redux/hooks';
import { fetchRatingsByOrderId, createRating } from '@/app/redux/slice/ratingSlice';
import { AuthContext } from '../context/authContext';

import RatingModal from '@/app/components/RatingModal';

const StyledCard = styled(Card)`
  margin: 1.5rem;
  padding: 1.5rem;
  border-radius: 15px;
  position: relative;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.18);
  }
`;

const TimerContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background-color: #ffb703;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  color: black;
  text-align: center;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const StyledTypography = styled(Typography)`
  font-weight: 500;
  color: #333;
`;

const BoldTypography = styled(Typography)`
  font-weight: 600;
  color: #2d3748;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #2c3e9d;
  }
  transition: background-color 0.3s ease;
`;

const AcceptButton = styled(Button)`
  background-color: #38a169;
  color: white;

  &:hover {
    background-color: #2f855a;
  }
  transition: background-color 0.3s ease;
`;

const DeclineButton = styled(Button)`
  background-color: #e53e3e;
  color: white;

  &:hover {
    background-color: #c53030;
  }
  transition: background-color 0.3s ease;
`;

const OrderCard = React.memo(({ order, onAccept, onDecline, onComplete, role }: any) => {
  const dispatch = useAppDispatch();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is not available');
  }
  const { userID } = authContext;
  const [timer, setTimer] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [isRated, setIsRated] = useState(false);
  const [existingRating, setExistingRating] = useState<any>(null);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRatingSubmit = async (rating: number | null) => {
    if (rating !== null) {
      const ratingData = {
        ratingValue: rating,
        buyerId: order.buyerId,
        sellerId: order.sellerId,
        orderId: order.orderId,
        raterId: Number(userID),
      };

      const response = await dispatch(createRating(ratingData));
      if (response.meta.requestStatus === 'fulfilled') {
        setIsRated(true);
        console.log(`Rating submitted: ${rating} stars for Order ID: ${order.orderId}`);
        toast.success('Thanks for your Time!');
      }
    }
  };


  const fetchExistingRating = async () => {
    const response = await dispatch(fetchRatingsByOrderId({ orderId: order.orderId, userId: Number(userID), role }));
    if (response.meta.requestStatus === 'fulfilled') {
      const ratings = response.payload.rating;
      if (ratings.length > 0) {
        setExistingRating(ratings);
        setIsRated(true);
      }
    }
  };

  useEffect(() => {
    fetchExistingRating();
  }, [dispatch, order.orderId]);

  const calculateTimeLeft = useCallback(() => {
    const deadlineDate = new Date(order.deadline);
    const currentTime = new Date();
    const difference = deadlineDate.getTime() - currentTime.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { days, hours, minutes, seconds };
    }
    return null;
  }, [order.deadline]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setTimer(timeLeft);
      if (timeLeft === null && order.orderStatus !== 'Completed') {
        onComplete(order.orderId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [calculateTimeLeft, onComplete, order]);

  return (
    <StyledCard key={order.id}>
      <TimerContainer>
        {order.orderStatus === 'Completed' ? (
          <Typography>Order is completed.</Typography>
        ) : timer ? (
          <Typography>
            {timer.days}d {timer.hours}h {timer.minutes}m {timer.seconds}s
          </Typography>
        ) : (
          <Typography>Order deadline passed.</Typography>
        )}
      </TimerContainer>

      <CardContent>
        <OrderInfo>
          <BoldTypography><strong>Buyer ID:</strong> {order.buyerId}</BoldTypography>
          <StyledTypography><strong>Seller ID:</strong> {order.sellerId}</StyledTypography>
          <StyledTypography><strong>Amount:</strong> ${parseFloat(order.amount).toFixed(2)}</StyledTypography>
          <StyledTypography><strong>Status:</strong> {order.orderStatus}</StyledTypography>
        </OrderInfo>

        {order.orderStatus === 'Pending' && role === 'Seller' ? (
          <ButtonGroup>
            <AcceptButton onClick={() => onAccept(order.orderId)}>Accept</AcceptButton>
            <DeclineButton onClick={() => onDecline(order.orderId)}>Decline</DeclineButton>
          </ButtonGroup>
        ) : (
          <div>
            {role === 'Buyer' && order.orderStatus !== 'Completed' && (
              <StyledButton variant="contained" onClick={() => onComplete(order.orderId)}>
                {order.orderStatus === 'Pending' ? 'Wait For Seller Approval' : 'Mark as Completed'}
              </StyledButton>
            )}
          </div>
        )}

        {order.orderStatus === 'Completed' && !isRated && !existingRating && (
          <>
            <StyledButton onClick={handleOpenModal}>
              Rate Us
            </StyledButton>
            <RatingModal
              open={isModalOpen}
              handleClose={handleCloseModal}
              handleRatingSubmit={handleRatingSubmit}
            />
          </>
        )}
      </CardContent>
    </StyledCard>
  );
});

OrderCard.displayName = 'OrderCard';

export default OrderCard;
