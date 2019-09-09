import React from 'react'
import { withMediaProps } from 'react-media-player'
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md'

function MuteUnmute ({ media }) {
  return (
    <div onClick={media.muteUnmute} style={{cursor: 'pointer'}}>
      { media.isMuted ?
        <MdVolumeOff size={32}/>
      :
        <MdVolumeUp size={32}/>
      }
    </div>
  )
}

export default withMediaProps(MuteUnmute)
