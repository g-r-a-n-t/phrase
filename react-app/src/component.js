import React, { useEffect } from 'react'
import { useWeb3Context } from 'web3-react'

// This component must be a child of <App> to have access to the appropriate context
export default function MyComponent () {
  const context = useWeb3Context()

  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  }, [])

  return (
    <React.Fragment>
      {context.account}
    </React.Fragment>
  );
}
