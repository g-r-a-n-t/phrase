import { useState, useEffect } from 'react'
import Ipfs from 'ipfs'

import config from '../config'
import debug from '../tools/debug'
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

export function useIpfsFileBuffer (path) {
  const [buf, setBuf] = useState(null)
  const ipfs = useIpfsContext()
  const cache = useCacheContext()

  useEffect(() => {
    fetchBuf(cache, ipfs, path, setBuf)
  }, [path, ipfs, cache])

  return buf
}

export function useIpfsString (path) {
  const buf = useIpfsFileBuffer(path)

  return bufToStr(buf)
}


export function useIpfsFileUrl (path, type) {
  const [url, setUrl] = useState(null)
  const ipfs = useIpfsContext()
  const cache = useCacheContext()

  useEffect(() => {
    fetchUrl(cache, ipfs, path, type, setUrl)
  }, [path, ipfs, cache, type])

  return url
}

export function useIpfsFileList(path) {
  const [files, setFiles] = useState(null)
  const ipfs = useIpfsContext()
  const cache = useCacheContext()

  useEffect(() => {
    fetchFileList(cache, ipfs, path, setFiles)
  }, [path, ipfs, cache])

  return files
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

  debug.networkOutbound('read IPFS file buffer', path)
  const buf = await ipfs.cat(path)
  debug.networkInbound(`read IPFS file buffer for ${path}`, buf)

  cache.set(id, buf)

  setBuf(buf)
}

// TODO: these methods should handle failures better.
// Some duplicate code here to avoid passing around large file buffers
async function fetchUrl (cache, ipfs, path, type, setUrl) {
  if (ipfs == null) return null

  const id = cacheId('ipfsUrl', path, type)

  if (maybeUseCache(cache, id, setUrl)) return null

  debug.networkOutbound('create IPFS file url', path)
  const buf = await ipfs.cat(path)
  const url = bufToUrl(buf, type)
  debug.networkInbound(`created IPFS file url for ${path}`, url)

  cache.set(id, url)

  setUrl(url)
}

async function fetchFileList (cache, ipfs, path, setFiles) {
  if (ipfs == null) return null

  const id = cacheId('ipfsFileList', path)

  if (maybeUseCache(cache, id, setFiles)) return null

  debug.networkOutbound('read IPFS file list', path)
  const files = await ipfs.files.ls(path)
  const names = files.map(file => file.name)
  debug.networkInbound(`read IPFS file list for ${path}`, names)

  cache.set(id, names)

  setFiles(names)
}


function maybeUseCache (cache, id, setValue) {
  const result = cache.get(id)

  if (result !== null) {
    setValue(result.val)
    return true
  }

  return false
}

async function uploadFilesAsFolder (ipfs, files, setPath) {
  if (ipfs == null) return null

  debug.networkOutbound('uploading files to IPFS', files)
  const result = await ipfs.add(files, { wrapWithDirectory: true })
  const path = result[result.length - 1].hash
  debug.networkInbound('files uploaded to IPFS', path)

  setPath(path)
}

function bufToUrl (buf, type) {
  if (buf == null) return null

  const blob = new Blob([buf], { type: type })
  const urlCreator = window.URL || window.webkitURL

  return urlCreator.createObjectURL(blob)
}

function bufToStr (buf) {
  if (buf == null) return null

  let s = ''

  buf.forEach((u) => {
    s += String.fromCharCode(u)
  })

  return s
}
