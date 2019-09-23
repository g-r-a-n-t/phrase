import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import connectors from './connectors.js'
import Web3Provider, { useWeb3Context } from 'web3-react'
import PropTypes from 'prop-types'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles.css'

import { useIpfs } from './hooks/useIpfs'
import { IpfsContext } from './contexts/ipfs'
import { CacheContext, Cache } from './contexts/cache'

function ContextProviders ({ children }) {
  const ipfs = useIpfs()

  return (
    <Web3Provider connectors={ connectors } libraryName="ethers.js">
      <CacheContext.Provider value={Cache()}>
        <IpfsContext.Provider value={ipfs}>
          { children }
        </IpfsContext.Provider>
      </CacheContext.Provider>
    </Web3Provider>
  )
}

ContextProviders.propTypes = {
  children: PropTypes.object.isRequired
}

ReactDOM.render(
  <ContextProviders>
    <App />
  </ContextProviders>,
  document.getElementById('root')
)
