import React, { useState } from 'react';
import A from './Components/A';
import "./App.css"

function App() {

  const [stateA, setStateA] = useState("Initial State A");
  const [stateB, setStateB] = useState('Initial State B');
  const [stateC, setStateC] = useState('Initial State C');
  const [stateD, setStateD] = useState('Initial State D');

  return (
    <div className="App">
      <h4>States are as follow: A -- {stateA},  B -- {stateB } , C -- {stateC} , D -- {stateD}</h4>
      <br/>
      <hr/>
      <A
        stateA={stateA} setStateA={setStateA}
        stateB={stateB} setStateB={setStateB}
        stateC={stateC} setStateC={setStateC}
        stateD={stateD} setStateD={setStateD}
      />
    </div>
  );
}

export default App;

