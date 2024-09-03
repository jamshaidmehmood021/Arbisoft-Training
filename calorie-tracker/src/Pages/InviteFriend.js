import React, { useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const REACT_APP_EMAIL_JS_SERVER_ID = 'service_egvm5ap';
const REACT_APP_EMAIL_JS_TEMPLATE_ID = 'template_zx4cp3b';
const REACT_APP_EMAIL_JS_PUBLIC_KEY = 'xjSvbJdjEwRctXcN-';
 
const InviteFriend = () => {
  const form = useRef();

  const handleInvite = useCallback(((e) => {
    e.preventDefault();
    emailjs
      .sendForm(REACT_APP_EMAIL_JS_SERVER_ID, REACT_APP_EMAIL_JS_TEMPLATE_ID, form.current, REACT_APP_EMAIL_JS_PUBLIC_KEY)
      .then(
        () => {
          toast.success('Invite sent successfully');
        },
        (error) => {
          toast.error('Failed to send invite', error.text);
        },
      );
  }),[]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Invite a Friend
        </h2>
        <form ref={form} onSubmit={handleInvite} className="space-y-6">
          <div>
            <label htmlFor="user-name" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Name
            </label>
            <input
              id='user-name'
              type="text"
              name="user-name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
              placeholder="Enter your friend's name"
              required
            />
          </div>
          <div>
            <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Email
            </label>
            <input
              id='user-email'
              type="email"
              name="user-email"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
              placeholder="Enter your friend's email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send Invite
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteFriend;
