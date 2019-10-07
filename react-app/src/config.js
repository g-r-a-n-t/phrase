import REGISTRY from './deployedContracts/Registry'

export default {
  ipfs: {
    local: {
      Bootstrap: [
        '/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmPvEgzKziX8HkvveB2w51DmuHFANM2HLmjXrbf22aLMnr'
      ]
    },
    remote: {
      host: '/ip4/127.0.0.1/tcp/5002'
    }
  },
  registry: {
    abi: REGISTRY.abi,
    address: REGISTRY.networks['5777'].address
  },
  debug: {
    components: false,
    cache: true,
    network: true
  }
}
