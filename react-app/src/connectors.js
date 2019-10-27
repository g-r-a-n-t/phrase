import { Connectors } from 'web3-react'
const { InjectedConnector } = Connectors

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 3, 4, 5777] })

export default { MetaMask }
