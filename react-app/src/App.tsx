import React from 'react';
import logo from './logo.svg';
import './App.css';

import Web3Provider, { useWeb3Context, Web3Consumer } from "web3-react";
import connectors from "./connectors";
import MyComponent from "./component";

const App: React.FC = () => {
  const context = useWeb3Context()
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={'ethers.js'}
    >
      <div className="App">
        <MyComponent />
      </div>
    </Web3Provider>
  );
}

export default App;
