import React, { useEffect } from 'react'
import { Media, ListGroup, ListGroupItem } from 'reactstrap'

import useIpfsFactory from '../../hooks/use-ipfs-factory'
import useIpfs from '../../hooks/use-ipfs'

function bufToUrl(buffer) {
  const blob = new Blob([buffer], {type: "image/jpeg"});
  const urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(blob);
}

export default function IpfsImage() {
  const { ipfs, ipfsInitError } = useIpfsFactory({ commands: ['id'] })
  const files = useIpfs(ipfs, 'get', 'QmavE42xtK1VovJFVTVkCR5Jdf761QWtxmvak9Zx718TVr/files/2015/04/CodeLaw.jpg')
  let url = 'temp'
  if(files != null) {
    url = bufToUrl(files[0].content)
  }

  console.log(url)
  return <img src={url} />
}
