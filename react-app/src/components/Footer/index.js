import React from 'react'

import { useMediaSelectionContext } from '../../contexts/mediaSelection'
import { IpfsImage } from '../../components/IpfsMedia'
import TrackPlayer from './TrackPlayer'

export default function Footer () {
  const [mediaSelection, setMediaSelection] = useMediaSelectionContext()

  if (mediaSelection == null) return null

  const player = (()=>{
    switch(mediaSelection.type) {
      case 'track':
        return <TrackPlayer
          _key={ mediaSelection._key }
          content={ mediaSelection.content }
        />
    }
  })()

  return (
    <div className="fixed-bottom bg-light border" style={{width: '100%', height: '60px'}}>
      <button onClick={() => {
        setMediaSelection(mediaSelection.next)
      }}>next</button>
      { player }
    </div>
  )
}
