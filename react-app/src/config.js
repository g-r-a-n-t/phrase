import process from 'process'

import REGISTRY from './deployedContracts/Registry'

// dev, test
const NODE_ENV = process.env.NODE_ENV || 'test'

export default {
  ipfs: {
    local: {
      Bootstrap: [
        {
          dev:  '/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmPvEgzKziX8HkvveB2w51DmuHFANM2HLmjXrbf22aLMnr',
          test: '/ip4/34.73.155.236/tcp/4003/ws/ipfs/QmfXZ3QnwguQZA5z4Z2Nm5AaQSiGf56Y8hikiSjLs7BSXD'
        }[NODE_ENV]
      ]
    },
    remote: {
      host: {
        dev:  '/ip4/127.0.0.1/tcp/5002',
        test: '/ip4/34.73.155.236/tcp/4002'
      }[NODE_ENV]
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
