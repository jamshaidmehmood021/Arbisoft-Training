import React from 'react';
import Card from '../Components/Card';

const Home = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center min-h-screen p-4">
      {Array.from({ length: 16 }, (_, index) => (
        <Card key={index} />
      ))}
    </div>
  );
}

export default Home;
