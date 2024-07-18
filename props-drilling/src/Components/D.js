import React from 'react';

const D = React.memo(({ stateD, setStateD }) => {
  console.log("Component D Rendered");
  return (
    <div>
      <h1>Component D: {stateD}</h1>
      <button onClick={() => setStateD(stateD + " Updated")}>Update D</button>
    </div>
  );
});

export default D;
