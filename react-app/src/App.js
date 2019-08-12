import React from 'react';

import Web3Provider, { useWeb3Context, Web3Consumer } from "web3-react";
import connectors from './connectors.js';
import Profile from "./pages/profile";

function App() {
  return (
    <Web3Provider
    connectors={connectors}
    libraryName={'ethers.js'}
    >
      <div className="App">
        <Profile />
      </div>
    </Web3Provider>
  );
}

export default App;
