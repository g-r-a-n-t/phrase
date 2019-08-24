import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import connectors from './connectors.js'
import Web3Provider from 'web3-react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useIpfs } from './hooks/useIpfs'
import { IpfsContext } from './contexts/ipfs'

function ContextProviders ({ children }) {
  const ipfs = useIpfs()
  if (ipfs == null) return <p>loading ipfs...</p>

  return (
    <IpfsContext.Provider value={ipfs}>
      {children}
    </IpfsContext.Provider>
  )
}

ContextProviders.propTypes = {
  children: PropTypes.elementType.isRequired
}

ReactDOM.render(
  <ContextProviders>
    <Web3Provider connectors={connectors} libraryName="ethers.js">
      <App />
    </Web3Provider>
  </ContextProviders>,
  document.getElementById('root')
)
