import React from 'react';
import './App.css';
import { StarknetProvider, getInstalledInjectedConnectors } from '@starknet-react/core'
import Main from './components/Main';

function App() {
  const connectors = getInstalledInjectedConnectors()

  return (
    <StarknetProvider connectors={connectors}>
      <div className='container'>
        <h1>Starknet</h1>
        <Main />
      </div>
    </StarknetProvider>
  );
}

export default App;
