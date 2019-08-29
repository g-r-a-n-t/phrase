import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import connectors from './connectors.js'
import Web3Provider, { useWeb3Context } from 'web3-react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useIpfs } from './hooks/useIpfs'
import { IpfsContext } from './contexts/ipfs'
import { CacheContext, Cache } from './contexts/cache'

function ContextProviders ({ children }) {
  const ipfs = useIpfs()
  const web3 = useWeb3Context()

  // TODO: remove to fix no-op warning
  useEffect(() => {
    web3.setFirstValidConnector(['MetaMask'])
  })

  if (ipfs == null) return <p>loading ipfs...</p>

  return (
    <CacheContext.Provider value={Cache()}>
      <IpfsContext.Provider value={ipfs}>
        {children}
      </IpfsContext.Provider>
    </CacheContext.Provider>
  )
}

ContextProviders.propTypes = {
  children: PropTypes.object.isRequired
}

ReactDOM.render(
  <Web3Provider connectors={connectors} libraryName="ethers.js">
    <ContextProviders>
      <App />
    </ContextProviders>
  </Web3Provider>,
  document.getElementById('root')
)
