import React from 'react';
import { StateAProvider } from './Contaxt/ContaxtA';
import { StateBProvider } from './Contaxt/ContaxtB';
import { StateCProvider } from './Contaxt/ContaxtC';
import { StateDProvider } from './Contaxt/ContaxtD';
import A from './Components/A'
import './App.css';

function App() {
  return (
    <StateAProvider>
      <StateBProvider>
        <StateCProvider>
          <StateDProvider>
            <div className="App">
              <h4>States are as follow:</h4>
              <A />
            </div>
          </StateDProvider>
        </StateCProvider>
      </StateBProvider>
    </StateAProvider>
  );
}

export default App;
