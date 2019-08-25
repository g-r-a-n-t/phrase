import { useMemo, useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import { ethers } from 'ethers'

import config from '../config'

export function useRegistryContract () {
  return useContract(config.registry.address, config.registry.abi)
}

// TODO: Should be able to remove the useEffect
export function useContract (address, ABI) {
  const context = useWeb3Context()

  // TODO: fix no-op warning
  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  })

  return useMemo(() => {
    if (context.library === undefined) return null

    return getContract(address, ABI, context.library, context.account)
  }, [address, ABI, context.library])
}

function getContract (address, ABI, library, account) {
  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new ethers.Contract(address, ABI, getProviderOrSigner(library, account))
}

function getProviderOrSigner(library, account) {
  return account ? new UncheckedJsonRpcSigner(library.getSigner(account)) : library
}

function isAddress (value) {
  try {
    return ethers.utils.getAddress(value.toLowerCase())
  } catch (e) {
    console.log(`Error parsing the address, ${value}: ${e}`)
    return false
  }
}

class UncheckedJsonRpcSigner extends ethers.Signer {
  constructor(signer) {
    super()
    ethers.utils.defineReadOnly(this, 'signer', signer)
    ethers.utils.defineReadOnly(this, 'provider', signer.provider)
  }

  getAddress() {
    return this.signer.getAddress()
  }

  sendTransaction(transaction) {
    return this.signer.sendUncheckedTransaction(transaction).then(hash => {
      return {
        hash: hash,
        nonce: null,
        gasLimit: null,
        gasPrice: null,
        data: null,
        value: null,
        chainId: null,
        confirmations: 0,
        from: null,
        wait: confirmations => {
          return this.signer.provider.waitForTransaction(hash, confirmations)
        }
      }
    })
  }

  signMessage(message) {
    return this.signer.signMessage(message)
  }
}
