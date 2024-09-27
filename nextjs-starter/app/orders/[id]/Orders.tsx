'use client';
import React, { useEffect, useContext,  useMemo, useCallback } from 'react';
import { Container, Typography} from '@mui/material';
//import { io } from 'socket.io-client';
import { supabase } from '@/app/supabase/supabase';
import { Bars } from 'react-loading-icons'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchOrdersByUserId,updateOrderStatus} from '@/app/redux/slice/orderSlice'; 

import { AuthContext } from '@/app/context/authContext';
import withAuth from '@/app/components/ProtectedRoute';

import OrderCard from '@/app/components/OrderCard';

const Orders = React.memo (() => {
  const dispatch = useAppDispatch();
  //const [socket, setSocket] = useState<any>(null);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { userID, role } = authContext;
  const { orders, loading, error } = useAppSelector((state) => state.orders);

  // useEffect(() => {
  //   const newSocket = io('http://localhost:5000');
  //   setSocket(newSocket);

  //   if (role === 'Seller') {
  //       newSocket.emit('joinOrderRoom', userID);
  //       newSocket.on('newOrder', (newOrder: any) => {
  //           dispatch(addNewOrder(newOrder.newOrder));
  //         });
  //       newSocket.on('statusUpdate', (status: any) => {
  //           if(status){
  //               dispatch(fetchOrdersByUserId(Number(userID)));
  //           }
  //       });
        
  //   } else if(role === 'Buyer') {
  //       if (orders.length > 0) {
  //         newSocket.emit('joinOrderRoom', orders[0].sellerId);
  //         newSocket.on('statusUpdate', (status: any) => {
  //           if(status){
  //               dispatch(fetchOrdersByUserId(Number(userID)));
  //           }
  //       });
  //       } else {
  //         console.warn("Orders array is empty, cannot emit joinOrderRoom for sellerId");
  //       }
  //   }

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, [userID, dispatch,orders]);

  useEffect(() => {
    if (userID) {
      dispatch(fetchOrdersByUserId(Number(userID)));
    }
  }, [dispatch, userID]);

  useEffect(() => {
    const orderChannel = supabase.channel('Orders');
    orderChannel.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Orders' }, (payload: any) => {
      console.log('INSERT event:', payload);
      dispatch(fetchOrdersByUserId(payload.new.buyerId));
    });
    orderChannel.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Orders' }, (payload: any) => {
      console.log('UPDATE event:', payload);
      if (payload && role === 'Buyer') {
        dispatch(fetchOrdersByUserId(payload.new.buyerId));
      } else {
        dispatch(fetchOrdersByUserId(payload.new.sellerId));
      }
    });
    orderChannel.subscribe();
    return () => {
      orderChannel.unsubscribe();
    };
  }, [dispatch, role]);
  

  const handleAccept = useCallback(async (orderId: number) => {
    const response = await dispatch(updateOrderStatus({ orderId, orderStatus: 'In Progress' }));
    if (response.payload.message === 'Order status updated successfully') {
      dispatch(fetchOrdersByUserId(Number(userID)));
    }
  }, [dispatch, userID]);

  const handleDecline = useCallback(async (orderId: number) => {
    const response = await dispatch(updateOrderStatus({ orderId, orderStatus: 'Declined' }));
    if (response.payload.message === 'Order status updated successfully') {
      dispatch(fetchOrdersByUserId(Number(userID)));
    }
  }, [dispatch, userID]);

  const handleComplete = useCallback(async (orderId: number) => {
    const response = await dispatch(updateOrderStatus({ orderId, orderStatus: 'Completed' }));
    if (response.payload.message === 'Order status updated successfully') {
      dispatch(fetchOrdersByUserId(Number(userID)));
    }
  }, [dispatch, userID]);

  const memoizedOrders = useMemo(() => (
    orders.map((order: any) => (
      <OrderCard
        key={order.orderId}
        role={role}
        order={order}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onComplete={handleComplete}
      />
    ))
  ), [orders, handleAccept, handleDecline, handleComplete, role]);


  if (loading) {
    return <Typography variant="h6"><Bars stroke="#98ff98" /></Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" className="my-4" style={{ textAlign: 'center', color: 'white' }}>My Orders</Typography>
      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        memoizedOrders
      )}
    </Container>
  );
})

Orders.displayName = 'Orders';

export default withAuth(Orders);
