import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'

import { useIpfsString, useIpfsFileUrl } from 'hooks/useIpfs'
import debug from 'tools/debug'

export function IpfsImage ({ width, height, path, type }) {
  debug.componentRender('IpfsImage', path, type)

  const url = useIpfsFileUrl(path, 'image/jpeg')

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
  debug.componentRender('IpfsText', path)

  const text = useIpfsString(path)

  if (text == null) return <Spinner type="grow" color="secondary" />

  return <>{ text }</>
}

IpfsText.propTypes = {
  path: PropTypes.string.isRequired
}
