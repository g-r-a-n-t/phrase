import REGISTRY from './deployedContracts/Registry'

export default {
  ipfs: {
    Bootstrap: [
      '/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmPvEgzKziX8HkvveB2w51DmuHFANM2HLmjXrbf22aLMnr'
    ]
  },
  registry: {
    abi: REGISTRY.abi,
    address: REGISTRY.networks['5777'].address
  }
}
