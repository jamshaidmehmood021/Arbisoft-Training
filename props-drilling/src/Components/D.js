import React from 'react';
import { useStateD } from '../Contaxt/ContaxtD';

const D = React.memo(() => {
  const { stateD, setStateD } = useStateD();
  console.log("Component D Rendered");

  return (
    <div>
      <h1>Component D: {stateD}</h1>
      <button onClick={() => setStateD(stateD + " Updated")}>Update D</button>
    </div>
  );
});

export default D;
