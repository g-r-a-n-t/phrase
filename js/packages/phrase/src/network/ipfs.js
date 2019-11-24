/** A number of IPFS network functions that leverage a cache. */
import { Cache, cacheId } from 'cache'

async function fetchBuf (cache, ipfs, path) {
  const id = cacheId('ipfsBuf', path)

  return cache.promise(
    id,
    () => { return ipfs.cat(path) }
  )
}

async function fetchUrl (cache, ipfs, path, type) {
  const id = cacheId('ipfsUrl', path, type)

  return cache.promise(
    id,
    () => {
      return new Promise((resolve, reject) => {
        ipfs.cat(path).then(buf => {
          const url = bufToUrl(buf, type)
          resolve(url)
        }, err => {
          reject(err)
        })
      })
    }
  )
}

async function fetchFileList (cache, ipfs, path) {
  return Promise(function (resolve) {
    const id = cacheId('ipfsFileList', path)

    if (maybeUseCache(cache, id, resolve)) return null

    const files = await ipfs.files.ls(path)
    const names = files.map(file => file.name)

    cache.set(id, names)

    resolve(names)
  })
}

function maybeUseCache (cache, id, setValue) {
  const result = cache.get(id)

  if (result !== null) {
    setValue(result.val)
    return true
  }

  return false
}

async function uploadFilesAsFolder (ipfs, files) {
  return Promise (function(resolve) {
    const result = await ipfs.add(files, {
      wrapWithDirectory: true,
      progress: p => { console.log('progress: ', p) },
      timeout: 5000000
    })
    const path = result[result.length - 1].hash

    // TODO: check if it doesnt already have /ipfs/
    resolve(`/ipfs/${path}`)
  }
}

function bufToUrl (buf, type) {
  if (buf == null) return null

  const blob = new Blob([buf], { type: type })
  const urlCreator = window.URL || window.webkitURL

  return urlCreator.createObjectURL(blob)
}
