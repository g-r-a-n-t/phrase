import { ethers } from 'ethers'

const tokens = {
  '0x0000000000000000000000000000000000000000': {
    name:   'Ether',
    symbol: 'ETH',
    unit: ethers.utils.bigNumberify('1000000000000000000')
  }
}

export function getToken (address) {
  return tokens[address]
}
