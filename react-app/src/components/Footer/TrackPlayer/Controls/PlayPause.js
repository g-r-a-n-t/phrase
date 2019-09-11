import React from 'react'
import { withMediaProps } from 'react-media-player'
import { MdPlayCircleOutline, MdPauseCircleOutline, MdFileDownload } from 'react-icons/md'

import { useMediaContext, PlayStatus, playing, paused } from '../../../../contexts/media'

function PlayPause ({ media: { play, pause, isPlaying } }) {
  const [media, setMedia] = useMediaContext()

  switch (media.status) {
    case PlayStatus.PLAYING:
      if (!isPlaying) play()

      return <MdPauseCircleOutline
        size={32}
        onClick={ () => setMedia(paused(media)) }
        style={{cursor: 'pointer'}}
      />
    case PlayStatus.PAUSED:
      if (isPlaying) pause()

      return <MdPlayCircleOutline
        size={32}
        onClick={ () => setMedia(playing(media)) }
        style={{cursor: 'pointer'}}
      />
    default:
      return <MdFileDownload
        size={32}
      />
  }
}

export default withMediaProps(PlayPause)
