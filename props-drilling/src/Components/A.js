import React from 'react';
import B from './B';

const A = React.memo(({ stateA, setStateA, stateB, setStateB, stateC, setStateC, stateD, setStateD }) => {
  console.log("Component A Rendered");
  return (
    <div>
      <h1>Component A: {stateA}</h1>
      <button onClick={() => setStateA("Updated State A")}>Update A</button>
      <B
        stateB={stateB} setStateB={setStateB}
        stateC={stateC} setStateC={setStateC}
        stateD={stateD} setStateD={setStateD}
      />
    </div>
  );
});

export default A;

