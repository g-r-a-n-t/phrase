import React from 'react'

import { useMediaContext } from '../../contexts/media'
import { IpfsImage } from '../../components/IpfsMedia'
import TrackPlayer from './TrackPlayer'

export default function Footer () {
  const [media, _] = useMediaContext()

  if (media == null) return null

  const player = (() => {
    switch(media.selection.type) {
      case 'track':
        return <TrackPlayer />
    }
  })()

  return (
    <div className="fixed-bottom bg-light border" style={{width: '100%'}}>
      { player }
    </div>
  )
}
