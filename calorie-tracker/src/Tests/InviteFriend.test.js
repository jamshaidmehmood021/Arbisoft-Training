import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import emailjs from '@emailjs/browser';

import InviteFriend from '../Pages/InviteFriend';

jest.mock('@emailjs/browser', () => ({
  sendForm: jest.fn(),
}));

describe('Render the InviteFriend Component', () => {
  test('renders form fields and button', () => {
    render(<InviteFriend />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Invite/i)).toBeInTheDocument();
  });

  test('It will add values to the form fields and check for the form submition', async () => {
    emailjs.sendForm.mockResolvedValueOnce({});
    render(<InviteFriend />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.click(screen.getByText(/Send Invite/i));
  });
});
