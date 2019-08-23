import { useMemo, useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import { ethers } from 'ethers'

import config from '../config'


export function useRegistryContract() {
  return useContract(config.registry.address, config.registry.abi)
}

// TODO: Should be able to remove the useEffect
export function useContract(address, ABI) {
  const context = useWeb3Context()

  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  }, [])

  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return useMemo(() => {
    if(context.library===undefined) return null
    try {
      return new ethers.Contract(address, ABI, context.library)
    } catch(e) {
      console.log('failed to get registry: ', e)
      return null
    }
  }, [address, ABI, context.library])
}

function isAddress(value) {
  try {
    return ethers.utils.getAddress(value.toLowerCase())
  } catch {
    return false
  }
}
