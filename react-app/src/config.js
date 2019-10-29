import REGISTRY from './deployedContracts/Registry'

// dev, test
// TODO: load from the environment
const NODE_ENV = 'dev'

export default {
  ipfs: {
    local: {
      Bootstrap: [
        {
          dev:  '/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmPvEgzKziX8HkvveB2w51DmuHFANM2HLmjXrbf22aLMnr',
          test: '/ip4/35.243.172.39/tcp/4003/ws/ipfs/QmfXZ3QnwguQZA5z4Z2Nm5AaQSiGf56Y8hikiSjLs7BSXD'
        }[NODE_ENV],
        '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
        '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
        '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
        '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
        '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
        '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
        '/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
        '/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6'
      ]
    },
    remote: {
      host: {
        dev:  '/ip4/127.0.0.1/tcp/5002',
        test: '/ip4/35.243.172.39/tcp/5002'
      }[NODE_ENV]
    }
  },
  registry: {
    abi: REGISTRY.abi,
    address: {
      dev: REGISTRY.networks['5777'].address,
      test: REGISTRY.networks['3'].address
    }[NODE_ENV]
  },
  debug: {
    components: false,
    cache: true,
    network: true
  }
}
