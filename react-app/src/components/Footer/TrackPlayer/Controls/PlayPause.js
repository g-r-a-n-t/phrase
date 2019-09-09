import React from 'react'
import { withMediaProps } from 'react-media-player'
import { MdPlayCircleOutline, MdPauseCircleOutline } from 'react-icons/md'

function PlayPause ({ media }) {
  return (
    <div onClick={media.playPause} style={{cursor: 'pointer'}}>
      { media.isPlaying ?
        <MdPauseCircleOutline size={32}/>
      :
        <MdPlayCircleOutline size={32}/>
      }
    </div>
  )
}

export default withMediaProps(PlayPause)
