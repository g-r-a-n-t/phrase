import { useState, useEffect, useContext } from 'react'
import Ipfs from 'ipfs'

import config from '../config'
import { IpfsContext } from '../contexts/ipfs'

// This should only be called once (when initializing the ipfs context)
export function useIpfs () {
  const [ipfs, setIpfs] = useState(null)

  useEffect(() => {
    startIpfs(setIpfs)
  }, [])

  return ipfs
}

// TODO: implement a similar method that returns a url and cache the url
export function useIpfsFileBuffer (path) {
  const [buf, setBuf] = useState(null)
  const ipfs = useContext(IpfsContext)

  useEffect(() => {
    fetchFile(ipfs, path, setBuf)
  }, [path, ipfs])

  return buf
}

export function useIpfsFilesUpload (file) {
  const [path, setPath] = useState(null)
  const ipfs = useContext(IpfsContext)

  useEffect(() => {
    uploadFilesAsFolder(ipfs, file, setPath)
  }, [ipfs, file])

  return path
}

async function startIpfs (setIpfs) {
  console.log('Starting IPFS')
  const _ipfs = await Ipfs.create({ config: config.ipfs })
  console.log('Started IPFS: ', _ipfs)
  setIpfs(_ipfs)
}

// TODO: add caching
async function fetchFile (ipfs, path, setBuf) {
  if (ipfs == null) return null

  console.log(`Reading IPFS file buffer for ${path}`)
  setBuf(await ipfs.cat(path))
  console.log('IPFS file buffer has been read')
}

async function uploadFilesAsFolder (ipfs, files, setPath) {
  if (ipfs == null) return null

  console.log('Uploading file to IPFS', files)
  const result = await ipfs.add(files, { wrapWithDirectory: true })
  const path = result[result.length - 1].hash
  console.log('File has been uploaded to IPFS with path ', path)

  setPath(path)
}
