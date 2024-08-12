import React from 'react';
import { useStateB } from '../Contaxt/ContaxtB';
import C from './C';

const B = React.memo(() => {
  const { stateB, setStateB } = useStateB();
  
  console.log("Component B Rendered");

  return (
    <div>
      <h1>Component B: {stateB}</h1>
      <button onClick={() => setStateB("Updated State B")}>Update B</button>
      <C />
    </div>
  );
});

export default B;
