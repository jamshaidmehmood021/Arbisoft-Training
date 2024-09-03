import React from 'react';
import { render, screen } from '@testing-library/react';

import Card from '../Components/Card'; 

describe('Card Component Testing', () => {
  const foodMock = {
    foodName: 'Apple',
    calories: 95,
    dateTime: '2024-09-01T12:00:00Z',
  };

  const foodString = JSON.stringify(foodMock);

  test('It Render Card Component', () => {
    render(<Card food={foodString} />);
  });

  test('It Displays the correct food name and calories in the corresponding fields', () => {
    render(<Card food={foodString} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Calories: 95')).toBeInTheDocument();
  });

  test('It will check the displaying of the Date and Time Fields', () => {
    render(<Card food={foodString} />);

    const formattedDate = new Date(foodMock.dateTime).toLocaleDateString();
    const formattedTime = new Date(foodMock.dateTime).toLocaleTimeString();

    expect(screen.getByText(`Date: ${formattedDate}`)).toBeInTheDocument();
    expect(screen.getByText(`Time: ${formattedTime}`)).toBeInTheDocument();
  });

  test('It will check the visibility of the Read more Link', () => {
    render(<Card food={foodString} />);

    const linkElement = screen.getByText(/Read more/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '#');
  });
});
