import React from 'react';
import { useStateC } from '../Contaxt/ContaxtC';
import D from './D';

const C = React.memo(() => {
  const { stateC, setStateC } = useStateC();

  console.log("Component C Rendered");

  return (
    <div>
      <h1>Component C: {stateC}</h1>
      <button onClick={() => setStateC("Updated State C")}>Update C</button>
      <D />
    </div>
  );
});

export default C;
