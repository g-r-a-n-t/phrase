import React from 'react'
import {
  ListGroup, ListGroupItem,
  Spinner
} from 'reactstrap'

import { usePhrase } from '../../hooks/useEntity'
import { IpfsImage, IpfsText, IpfsTracks } from '../IpfsMedia'

export function AlbumFront ({ _key }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <IpfsImage
      width="400px"
      height="400px"
      path={`${phrase.content}/cover.jpg`}
      type="image/jpeg"
    />
  )
}

export function AlbumBack ({ _key }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <div style={{ margin: '10px' }}>
      <h6 className="text-secondary">
        <IpfsText path={`${phrase.content}/name.txt`} />
      </h6>
      <div>
        <IpfsTracks path={phrase.content} />
      </div>
    </div>
  )
}
