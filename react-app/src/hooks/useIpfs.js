import { useState, useEffect } from 'react'
import Ipfs from 'ipfs'
import ipfsClient from 'ipfs-http-client'

import config from 'config'
import debug from 'tools/debug'
import { useIpfsContext } from 'contexts/ipfs'
import { useCacheContext, cacheId } from 'contexts/cache'

// This should only be called once (when initializing the ipfs context)
export function useIpfs () {
  const [local, setLocal] = useState(null)

  useEffect(() => {
    startIpfs(setLocal)
  }, [])

  if (local === null) return null

  return { local: local, remote: ipfsClient(config.ipfs.remote.host) }
}

export function useIpfsFileBuffer (path) {
  const [buf, setBuf] = useState(null)
  const ipfs = useIpfsContext().local
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
  const ipfs = useIpfsContext().local
  const cache = useCacheContext()

  useEffect(() => {
    fetchUrl(cache, ipfs, path, type, setUrl)
  }, [path, ipfs, cache, type])

  return url
}

export function useIpfsFileList (path) {
  const [files, setFiles] = useState(null)
  const ipfs = useIpfsContext().local
  const cache = useCacheContext()

  useEffect(() => {
    fetchFileList(cache, ipfs, path, setFiles)
  }, [path, ipfs, cache])

  return files
}

export function useIpfsFilesUpload (files) {
  const [path, setPath] = useState(null)
  const ipfs = useIpfsContext().remote

  useEffect(() => {
    uploadFilesAsFolder(ipfs, files, setPath)
  }, [ipfs, files])

  return path
}

async function startIpfs (setIpfs) {
  console.log('Starting IPFS')
  const ipfs = await Ipfs.create({ config: config.ipfs.local })
  console.log('Started IPFS: ', ipfs)
  setIpfs(ipfs)
}

// TODO: these methods should handle failures better.
async function fetchBuf (cache, ipfs, path, setBuf) {
  const id = cacheId('ipfsBuf', path)

  cache.merge(
    id,
    done => {
      debug.networkOutbound('read IPFS file buffer', path)

      ipfs.cat(path).then(buf => {
        debug.networkInbound(`read IPFS file buffer for ${path}`, buf)
        done(buf)
      })
    },
    url => setBuf(url)
  )
}

// TODO: these methods should handle failures better.
// Some duplicate code here to avoid passing around large file buffers
async function fetchUrl (cache, ipfs, path, type, setUrl) {
  const id = cacheId('ipfsUrl', path, type)

  cache.merge(
    id,
    done => {
      debug.networkOutbound('create IPFS file url', path)

      ipfs.cat(path).then(buf => {
        const url = bufToUrl(buf, type)
        debug.networkInbound(`created IPFS file url for ${path}`, url)
        done(url)
      })
    },
    url => setUrl(url)
  )
}

async function fetchFileList (cache, ipfs, path, setFiles) {
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
  debug.networkOutbound('uploading files to IPFS', files)
  const result = await ipfs.add(files, {
    wrapWithDirectory: true,
    progress: p => { console.log('progress: ', p) },
    timeout: 5000000
  })
  const path = result[result.length - 1].hash
  debug.networkInbound('files uploaded to IPFS', path)

  // TODO: check if it doesnt already have /ipfs/
  setPath(`/ipfs/${path}`)
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
