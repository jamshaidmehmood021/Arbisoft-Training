'use client';
import React, { useEffect, useContext,  useMemo } from 'react';
import { Container, Typography} from '@mui/material';
//import { io } from 'socket.io-client';
import { supabase } from '@/app/supabase/supabase';
import { Bars } from 'react-loading-icons'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchOrdersByUserId, addNewOrder, updateOrderStatus} from '@/app/redux/slice/orderSlice'; 

import { AuthContext } from '@/app/context/authContext';
import withAuth from '@/app/components/ProtectedRoute';

const OrderCard = React.lazy(() => import('@/app/components/OrderCard'));

const Orders = React.memo (() => {
  const dispatch = useAppDispatch();
  //const [socket, setSocket] = useState<any>(null);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { userID, role } = authContext;
  const { orders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (userID) {
      dispatch(fetchOrdersByUserId(Number(userID)));
    }
  }, [dispatch, userID]);


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
        const orderChannel = supabase
            .channel('Orders')
            .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'Orders',
            }, (payload: any) => {
                dispatch(addNewOrder(payload.new));
            })
            .subscribe();
        return () => {
            orderChannel.unsubscribe();
        };

    }, [dispatch]);

   useEffect(() => {
    const orderUpdate = supabase
            .channel('Orders')
            .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'Orders',
            }, (payload: any) => {
                if(payload && role === 'Buyer')
                {
                    dispatch(fetchOrdersByUserId(payload.new.buyerId));
                }
                else{
                    dispatch(fetchOrdersByUserId(payload.new.sellerId));
                }
            })
            .subscribe();
        return () => {
            orderUpdate.unsubscribe();
        };
    }, [dispatch]);

  const handleAccept = async (orderId: number) => {
    const response = await dispatch(updateOrderStatus({ orderId, orderStatus: 'In Progress' }));
    if (response.payload.message === "Order status updated successfully") {
        dispatch(fetchOrdersByUserId(Number(userID)));
    }
  };

  const handleDecline = async (orderId: number) => {
    const response = await dispatch(updateOrderStatus({ orderId, orderStatus: 'Declined' }));
    if (response.payload.message === "Order status updated successfully") {
        dispatch(fetchOrdersByUserId(Number(userID)));
    }
  };

  const handleComplete = async (orderId: number) => {
    const response = await dispatch(updateOrderStatus({ orderId, orderStatus: 'Completed' }));
    if (response.payload.message === "Order status updated successfully") {
        dispatch(fetchOrdersByUserId(Number(userID)));
    }
  };

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
  ), [orders]);

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
