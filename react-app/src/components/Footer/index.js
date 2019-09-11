import React from 'react'

import { useMediaContext } from '../../contexts/media'
import TrackPlayer from './TrackPlayer'

export default function Footer () {
  const [media] = useMediaContext()

  if (media == null) return null

  const player = (() => {
    switch (media.selection.type) {
      case 'track':
        return <TrackPlayer />
      default:
        return null
    }
  })()

  return (
    <div className="fixed-bottom bg-light border" style={{ width: '100%' }}>
      { player }
    </div>
  )
}
