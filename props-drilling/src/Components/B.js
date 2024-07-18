import React from 'react';
import C from './C';

const B = React.memo(({ stateB, setStateB, stateC, setStateC, stateD, setStateD }) => {
  console.log("Component B Rendered");
  return (
    <div>
      <h1>Component B: {stateB}</h1>
      <button onClick={() => setStateB("Updated State B")}>Update B</button>
      <C stateC={stateC} setStateC={setStateC} stateD={stateD} setStateD={setStateD} />
    </div>
  );
});

export default B;
