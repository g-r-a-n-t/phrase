/** A number of IPFS network functions that leverage a cache. */
const { Cache, cacheId } = require('../cache.js')

exports.Ipfs = class {
  constructor (ipfs) {
    this.ipfs = ipfs
    this.cache = new Cache()
  }

  fetchText (path) {
    return this.cache.promise(
      cacheId('ipfsBuf', path),
      () => this.ipfs.cat(path).then(buf => buf.toString('utf8'))
    )
  }

  fetchUrl (path, type) {
    return this.cache.promise(
      cacheId('ipfsUrl', path, type),
      () => this.ipfs.cat(path).then(buf => bufToUrl(buf, type))
    )
  }

  fetchExt (ext, path) {
    return {
      txt: fetchText(path),
      jpg: fetchUrl(path, 'image/jpeg'),
      mp3: fetchUrl(path, 'audio/mpeg3')
    }[ext]
  }

  fetchFileList (path) {
    return this.cache.promise(
      cacheId('ipfsFileList', path),
      () => this.ipfs.files.ls(path).then(files => files.map(file => file.name))
    )
  }

  uploadFilesAsFolder (files) {
    return this.ipfs.add(files, {
      wrapWithDirectory: true,
      timeout: 5000000
    }).then(result => result[result.length - 1].hash)
  }
}

function bufToUrl (buf, type) {
  if (buf == null) return null

  const blob = new Blob([buf], { type: type })
  const urlCreator = window.URL || window.webkitURL

  return urlCreator.createObjectURL(blob)
}
