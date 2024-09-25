'use client';

import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/app/redux/hooks'; 
import { useAppSelector } from '@/app/redux/hooks';
import { selectGigById } from '@/app/redux/slice/gigSlice';
import {fetchOrdersByGigAndUserId} from '@/app/redux/slice/orderSlice';
import {Gig} from '@/app/redux/slice/gigSlice';

import {toast} from 'react-toastify';

import { AuthContext } from '@/app/context/authContext';
import withAuth from '@/app/components/ProtectedRoute';


const CreateOrder = ({ params }: { params: { gigId: string } }) => {
  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [orderFound, setOrderFound] = useState(false);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {gigId} = params;
  const gig: Gig | undefined = useAppSelector((state) => selectGigById(state, Number(gigId)));

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { userID } = authContext;

  const buyerId = userID; 
  const sellerId = gig?.userId; 

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await dispatch(fetchOrdersByGigAndUserId({ gigId: Number(gig?.id), userId: Number(userID) }));
      if (result.payload !== 'No orders found for this buyer and gig combination.') {
        toast.error('You already have an active order on this gig.');
        setOrderFound(true);
      }
    };
    fetchOrder();
  }, [gig]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
      gigId,
      buyerId,
      sellerId,
      amount,
      deadline,
    };

    router.push(`/payment/${amount}?orderData=${encodeURIComponent(JSON.stringify(orderData))}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create an Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={orderFound}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:animate-pulse"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default withAuth(CreateOrder);
