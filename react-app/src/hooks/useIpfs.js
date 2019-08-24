import { useState, useEffect, useContext } from 'react'
import Ipfs from 'ipfs'

import config from '../config'
import { IpfsContext } from '../contexts/ipfs'

// TODO: fix missing dependency warning
export function useIpfsFileBuffer (path) {
  const [buf, setBuf] = useState(null)
  const ipfs = useContext(IpfsContext)

  useEffect(() => {
    fetchFile(ipfs, path, setBuf)
  }, [path, ipfs])

  return buf
}

export function useIpfs () {
  const [ipfs, setIpfs] = useState(null)

  useEffect(() => {
    startIpfs(setIpfs)
  }, [])

  return ipfs
}

async function startIpfs (setIpfs) {
  console.log('Starting IPFS')
  const _ipfs = await Ipfs.create({ config: config.ipfs })
  console.log('Started IPFS: ', _ipfs)
  setIpfs(_ipfs)
}

async function fetchFile (ipfs, path, setBuf) {
  if (ipfs == null) return null

  console.log(`Reading IPFS file buffer for ${path}`)
  setBuf(await ipfs.files.read(path))
  console.log('IPFS file buffer has been read')
}
