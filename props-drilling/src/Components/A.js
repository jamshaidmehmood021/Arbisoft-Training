import React from 'react';
import { useStateA } from '../Contaxt/ContaxtA'
import B from './B';

const A = React.memo(() => {
  const { stateA, setStateA } = useStateA();
  console.log("Component A Rendered");

  return (
    <div>
      <h1>Component A: {stateA}</h1>
      <button onClick={() => setStateA("Updated State A")}>Update A</button>
      <B />
    </div>
  );
});

export default A;
