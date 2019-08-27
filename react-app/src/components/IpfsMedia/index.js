import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'

import { useIpfsFileBuffer, useIpfsFileUrl } from '../../hooks/useIpfs'
import { debugComponentRender } from '../../tools/debug'

export function IpfsImage ({ width, height, path, type }) {
  debugComponentRender('IpfsImage', path, type)

  const url = useIpfsFileUrl(path)

  if (url == null) return <Spinner type="grow" color="secondary" />

  return <img width={width} height={height} src={url} alt="profile icon"/>
}

IpfsImage.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export function IpfsText ({ path }) {
  debugComponentRender('IpfsText', path)

  const buf = useIpfsFileBuffer(path)

  if (buf == null) return <Spinner type="grow" color="secondary" />

  const text = bufToString(buf)

  return <span>{text}</span>
}

IpfsText.propTypes = {
  path: PropTypes.string.isRequired
}

function bufToString (buffer) {
  let s = ''

  buffer.forEach((u) => {
    s += String.fromCharCode(u)
  })

  return s
}
