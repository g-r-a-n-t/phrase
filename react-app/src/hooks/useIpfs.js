import { useState, useEffect, useContext } from 'react'
import Ipfs from 'ipfs'

import config from '../config'
import { IpfsContext } from '../contexts/ipfs'

// TODO: fix missing dependency warning
export function useIpfsFileBuffer (path) {
  const [buf, setBuf] = useState(null)
  const ipfs = useContext(IpfsContext)

  async function fetchFile () {
    if (ipfs == null) return null
    console.log(`Reading IPFS file buffer for ${path}`)
    setBuf(await ipfs.files.read(path))
    console.log('IPFS file buffer has been read')
  }

  useEffect(() => {
    fetchFile()
  }, [path, ipfs])

  return buf
}

export function useIpfs () {
  const [ipfs, setIpfs] = useState(null)

  async function startIpfs () {
    console.log('Starting IPFS')
    const _ipfs = await Ipfs.create({ config: config.ipfs })
    console.log('Started IPFS: ', _ipfs)
    setIpfs(_ipfs)
  }

  useEffect(() => {
    startIpfs()
  }, [])

  return ipfs
}
