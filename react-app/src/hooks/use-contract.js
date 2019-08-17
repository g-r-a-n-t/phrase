import { useWeb3Context } from 'web3-react'
import { useMemo } from 'react'
import { ethers } from 'ethers'

import { localAddresses } from '../constants'
import REGISTRY_ABI from '../constants/abis/Registry'

export function useRegistryContract() {
  const { library } = useWeb3Context()
  return useContract(localAddresses.REGISTRY_ADDRESS, REGISTRY_ABI, library)
}

export function useContract(address, ABI, library) {
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
