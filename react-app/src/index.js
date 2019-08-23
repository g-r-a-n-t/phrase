import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import connectors from './connectors.js';
import Web3Provider from "web3-react";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useIpfs } from './hooks/useIpfs'
import { IpfsContext } from './contexts/ipfs'

function ContextProviders({ children }) {
  const ipfs = useIpfs()
  if (ipfs == null) return <p>loading ipfs...</p>

  return (
    <IpfsContext.Provider value={ipfs}>
      {children}
    </IpfsContext.Provider>
  )
}

ReactDOM.render(
  <ContextProviders>
    <Web3Provider connectors={connectors} libraryName="ethers.js">
        <App />
    </Web3Provider>
  </ContextProviders>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
