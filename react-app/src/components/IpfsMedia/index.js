import React from 'react'
import { Spinner } from 'reactstrap'

import { useIpfsFileBuffer } from '../../hooks/useIpfs'

export function IpfsImage({ width, path, type }) {
  console.log('Rendering IpfsImage: (path type) ', path, type)

  const buf = useIpfsFileBuffer(path)

  if (buf == null) return <Spinner type="grow" color="secondary" />

  const url = bufToUrl(buf, type)

  return <img width={width} src={url} alt="profile icon"/>
}

export function IpfsText({ path }) {
  console.log('Rendering IpfsText: (path) ', path)

  const buf = useIpfsFileBuffer(path)

  if (buf == null) return <Spinner type="grow" color="secondary" />

  const text = bufToString(buf)

  return <span>{text}</span>
}

function bufToString(buffer) {
  let s = ''
  buffer.forEach((u) => {
    s += String.fromCharCode(u)
  })

  return s
}

function bufToUrl(buf, type) {
  const blob = new Blob([buf], {type: type});
  const urlCreator = window.URL || window.webkitURL;

  return urlCreator.createObjectURL(blob);
}
