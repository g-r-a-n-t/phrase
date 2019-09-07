import React from 'react'
import PropTypes from 'prop-types'
import {
  IoIosPlayCircle,
  IoIosPause
} from 'react-icons/io'
import { Spinner } from 'reactstrap'

import { useIpfsFileBuffer, useIpfsFileUrl, useIpfsFileList } from '../../hooks/useIpfs'
import debug from '../../tools/debug'

export function IpfsImage ({ width, height, path, type }) {
  debug.componentRender('IpfsImage', path, type)

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
  debug.componentRender('IpfsText', path)

  const buf = useIpfsFileBuffer(path)

  if (buf == null) return <Spinner type="grow" color="secondary" />

  const text = bufToString(buf)

  return <span>{text}</span>
}

IpfsText.propTypes = {
  path: PropTypes.string.isRequired
}

export function IpfsTracks ({ path }) {
  debug.componentRender('IpfsTracks', path)

  const files = useIpfsFileList(path)

  if (files == null) return <Spinner type="grow" color="secondary" />

  const trackReg = /^\d{2} (.+)\.mp3$/

  const tracks = files.filter(file => trackReg.test(file))

  const elements = tracks.map(track => <IpfsTrack path={`${path}/${track}`}/>)

  return (
    <div>
      { elements }
    </div>
  )
}

export function IpfsTrack ({ path }) {
  debug.componentRender('IpfsTrack', path)

  const url = useIpfsFileUrl(path, 'audio/mpeg3')

  if (url == null) return <Spinner type="grow" color="secondary" />

  const trackReg = /^.+\/(\d{2}) (.+)\.mp3$/
  const number = path.match(trackReg)[1]
  const name = path.match(trackReg)[2]

  return (
    <div className="small bg-white border" style={{padding: '3px', margin: '1px'}}>
      <IoIosPlayCircle size={18} /> { number }. <b>{ name }</b>
    </div>
  )
}

function bufToString (buffer) {
  let s = ''

  buffer.forEach((u) => {
    s += String.fromCharCode(u)
  })

  return s
}
