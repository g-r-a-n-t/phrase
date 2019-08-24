import React from 'react'

import { useIpfsFileBuffer } from '../../hooks/useIpfs'

export function IpfsImage({ width, path, type }) {
  console.log('Rendering IpfsImage: (path type) ', path, type)

  const buf = useIpfsFileBuffer(path)

  let url = 'temp' // TODO: do a better job of loading this
  if(buf != null) {
    url = bufToUrl(buf, type)
  }

  return <img width={width} src={url} alt="profile icon"/>
}

export function IpfsText({ path }) {
  console.log('Rendering IpfsText: (path) ', path)

  const buf = useIpfsFileBuffer(path)
  const text = bufToString(buf)

  return <span>{text}</span>
}

function bufToString(buffer) {
  if (buffer == null) return null

  let s = ''
  buffer.forEach((u) => {
    s += String.fromCharCode(u)
  })

  return s
}

function bufToUrl(buffer, type) {
  const blob = new Blob([buffer], {type: type});
  const urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(blob);
}
