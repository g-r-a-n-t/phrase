import React, { useEffect } from 'react'
import { useWeb3Context } from 'web3-react'

// This component must be a child of <App> to have access to the appropriate context
export default function MyComponent () {
  const context = useWeb3Context()

  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  }, [])

  /*
  if (!context.active && !context.error) {
    // loading
    return ("loading");
  } else if (context.error) {
    //error
    return ("fuck!");
  } else {
    // success
    return ("hell yea...");
  }
  */
  return (
    <React.Fragment>
      {context.account}
    </React.Fragment>
  );
}
