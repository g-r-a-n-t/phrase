import React from 'react'
import { Media, Player, controls } from 'react-media-player'
import { Spinner } from 'reactstrap'

import { useIpfsFileUrl } from '../../hooks/useIpfs'
import { usePhrase } from '../../hooks/useEntity'
import { decomposeTrack }from '../../tools/paths'

const { PlayPause, MuteUnmute, SeekBar, Duration, Volume, Progress } = controls

export default function TrackPlayer ({ _key, content }) {
  const phrase = usePhrase(_key)
  const audio = useIpfsFileUrl(content, 'audio/mpeg3')

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  const track = decomposeTrack(content)

  return (
    <>
      <Media>
        <div className="media">
          <div className="media-player">
            <Player src={ audio } />
          </div>
          <div className="media-controls">
            <PlayPause />
            <SeekBar />
            <Duration />
            <MuteUnmute />
            <Volume />
          </div>
        </div>
      </Media>
    </>
  )
}
