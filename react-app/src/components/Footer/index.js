import React from 'react'

import { useMediaSelectionContext } from '../../contexts/mediaSelection'
import { IpfsImage } from '../../components/IpfsMedia'
import TrackPlayer from './TrackPlayer'

export default function Footer () {
  const [mediaSelection, setMediaSelection] = useMediaSelectionContext()

  if (mediaSelection == null) return null

  // key is required on TrackPlayer to reinit the completion state
  // completed state in track player is needed due to multiple time
  // change events being called.
  const player = (()=>{
    switch(mediaSelection.type) {
      case 'track':
        return <TrackPlayer key={`trackPlayer-${mediaSelection.content}`}
          _key={ mediaSelection._key }
          content={ mediaSelection.content }
          onComplete={ () => setMediaSelection(mediaSelection.next) }
        />
    }
  })()

  return (
    <div className="fixed-bottom bg-light border" style={{width: '100%'}}>
      { player }
    </div>
  )
}
