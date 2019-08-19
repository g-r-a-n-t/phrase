import { useWeb3Context } from 'web3-react'
import { useMemo } from 'react'
import { ethers } from 'ethers'

import config from '../config'
import REGISTRY_ABI from '../abis/Registry'

export function useRegistryContract() {
  return useContract(config.registry.address, REGISTRY_ABI)
}

export function useContract(address, ABI) {
  const { library } = useWeb3Context()

  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return useMemo(() => {
    try {
      return new ethers.Contract(address, ABI, library)
    } catch {
      return null
    }
  }, [address, ABI, library])
}

function isAddress(value) {
  try {
    return ethers.utils.getAddress(value.toLowerCase())
  } catch {
    return false
  }
}
