'use client';
import React, { useEffect, useContext } from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchOrdersByUserId } from '@/app/redux/slice/orderSlice'; 
import { AuthContext } from '@/app/context/authContext';

const StyledCard = styled(Card)`
  margin: 1rem;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Orders = () => {
  const dispatch = useAppDispatch();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { userID } = authContext;
  const { orders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (userID) {
      dispatch(fetchOrdersByUserId(Number(userID))); 
    }
  }, [dispatch, userID]);

  if (loading) {
    return <Typography variant="h6">Loading orders...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" className="my-4">My Orders</Typography>
      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map((order : any) => (
          <StyledCard key={order.id}>
            <CardContent>
              <Typography variant="h6">Order ID: {order.id}</Typography>
              <Typography>Gig ID: {order.gigId}</Typography>
              <Typography>Buyer ID: {order.buyerId}</Typography>
              <Typography>Seller ID: {order.sellerId}</Typography>
              <Typography>Amount: ${parseFloat(order.amount).toFixed(2)}</Typography>
              <Typography>Status: {order.orderStatus}</Typography>
              <Typography>Deadline: {new Date(order.deadline).toLocaleDateString()}</Typography>
              <Button variant="contained" color="primary" className="mt-2">
                View Details
              </Button>
            </CardContent>
          </StyledCard>
        ))
      )}
    </Container>
  );
}

export default Orders;
