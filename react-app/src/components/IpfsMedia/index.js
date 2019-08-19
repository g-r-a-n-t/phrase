import React from 'react'
import { Media } from 'reactstrap'

import useIpfsFactory from '../../hooks/useIpfsFactory'
import useIpfs from '../../hooks/useIpfs'

function bufToUrl(buffer, type) {
  const blob = new Blob([buffer], {type: type});
  const urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(blob);
}

export default function IpfsMedia({ path, type }) {
  const { ipfs } = useIpfsFactory({ commands: []})
  const files = useIpfs(ipfs, 'get', path)

  let url = 'temp'
  if(files != null && files.length === 1) {
    url = bufToUrl(files[0].content, type)
  }

  return <Media object src={url} alt="Generic placeholder image" />
}
