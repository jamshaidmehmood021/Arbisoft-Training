import React from 'react';
import D from './D';

const C = React.memo(({ stateC, setStateC, stateD, setStateD }) => {
  console.log("Component C Rendered");
  return (
    <div>
      <h1>Component C: {stateC}</h1>
      <button onClick={() => setStateC("Updated State C")}>Update C</button>
      <D stateD={stateD} setStateD={setStateD} />
    </div>
  );
});

export default C;
