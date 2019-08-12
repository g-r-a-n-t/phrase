import React, { useEffect } from 'react'
import { useWeb3Context } from 'web3-react'

import { Button } from 'reactstrap';
import PhraseNavbar from '../components/navbar'

// This component must be a child of <App> to have access to the appropriate context
export default function Profile () {
  const context = useWeb3Context()

  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  }, [])

  return (
    <PhraseNavbar />
    
  );
}
