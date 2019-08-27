import { useState, useEffect, useContext } from 'react'
import Ipfs from 'ipfs'

import config from '../config'
import { useIpfsContext } from '../contexts/ipfs'
import { useCacheContext, cacheId } from '../contexts/cache'

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
  const ipfs = useIpfsContext()
  const cache = useCacheContext()

  useEffect(() => {
    fetchBuf(cache, ipfs, path, setBuf)
  }, [path, ipfs])

  return buf
}

export function useIpfsFileUrl (path, type) {
  const [url, setUrl] = useState(null)
  const ipfs = useIpfsContext()
  const cache = useCacheContext()

  useEffect(() => {
    fetchUrl(cache, ipfs, path, type, setUrl)
  }, [path, ipfs])

  return url
}

export function useIpfsFilesUpload (file) {
  const [path, setPath] = useState(null)
  const ipfs = useIpfsContext()

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

// TODO: these methods should handle failures better.
async function fetchBuf (cache, ipfs, path, setBuf) {
  if (ipfs == null) return null

  const id = cacheId('ipfsBuf', path)

  if (maybeUseCache(cache, id, setBuf)) return null

  console.log(`Reading IPFS file buffer for ${path}`)
  const buf = await ipfs.cat(path)
  console.log('IPFS file buffer has been read')

  cache.set(id, buf)

  setBuf(buf)
}

// TODO: these methods should handle failures better.
// Some duplicate code here to avoid passing around large file buffers
async function fetchUrl (cache, ipfs, path, type, setUrl) {
  if (ipfs == null) return null

  const id = cacheId('ipfsUrl', path, type)

  if (maybeUseCache(cache, id, setUrl)) return null

  console.log(`Creating browser friendly IPFS file url for ${path}`)
  const buf = await ipfs.cat(path)
  const url = bufToUrl(buf, type)
  console.log('IPFS file url has been created: ')

  cache.set(id, url)

  setUrl(url)
}

function maybeUseCache(cache, id, setValue) {
  const result = cache.get(id)

  if (result !== null) {
    setValue(result.obj)
    return true
  }

  return false
}

async function uploadFilesAsFolder (ipfs, files, setPath) {
  if (ipfs == null) return null

  console.log('Uploading file to IPFS', files)
  const result = await ipfs.add(files, { wrapWithDirectory: true })
  const path = result[result.length - 1].hash
  console.log('File has been uploaded to IPFS with path ', path)

  setPath(path)
}

function bufToUrl (buf, type) {
  const blob = new Blob([buf], { type: type })
  const urlCreator = window.URL || window.webkitURL

  return urlCreator.createObjectURL(blob)
}
