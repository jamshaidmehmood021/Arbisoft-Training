'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/app/redux/hooks';
import { selectGigById } from '@/app/redux/slice/gigSlice';
import {Gig} from '@/app/redux/slice/gigSlice';

import { AuthContext } from '@/app/context/authContext';


const CreateOrder = ({ params }: { params: { gigId: string } }) => {
  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState('');
  const router = useRouter();

  const {gigId} = params;
  const gig: Gig | undefined = useAppSelector((state) => selectGigById(state, Number(gigId)));

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { userID } = authContext;

  const buyerId = userID; 
  const sellerId = gig?.userId; 

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
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
