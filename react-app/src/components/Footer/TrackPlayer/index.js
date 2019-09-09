import React, { useState } from 'react'
import { Media, Player, controls } from 'react-media-player'
import {
  Row, Col,
  Spinner
} from 'reactstrap'

import { useIpfsFileUrl } from '../../../hooks/useIpfs'
import { usePhrase } from '../../../hooks/useEntity'
import { decomposeTrack }from '../../../tools/paths'
import { PlayPause, MuteUnmute, Time, Next, Prev } from './Controls'
import { AlbumThumb } from '../../../components/Phrase'

const { SeekBar, Duration, Volume } = controls

export default function TrackPlayer ({ _key, content, onComplete }) {
  const phrase = usePhrase(_key)
  const audio = useIpfsFileUrl(content, 'audio/mpeg3')
  const [completed, setCompleted] = useState(false) // required due to multiple time change events being called with same value

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  const track = decomposeTrack(content)

  return (
    <Media>
      <div style={{margin: '10px'}}>
        <div style={{width: '0px', height: '0px'}}>
          <Player
            src={ audio }
            autoPlay={ true }
            onTimeUpdate={(e) => {
              if (!completed && e.currentTime == e.duration) {
                setCompleted(true)
                onComplete()
              }
            }}
          />
        </div>
        <Row>
          <Col>
            <AlbumThumb _key={ _key } track={content} />
          </Col>
          <Col className="d-flex justify-content-center">
            <div className="d-flex p-2">
              <Prev /> <PlayPause /> <Next />&nbsp;
              <SeekBar style={{width: '400px'}} />&nbsp;
              <Time />
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <div className="d-flex p-2">
              <MuteUnmute />
              <Volume style={{width: '50px'}} />
            </div>
          </Col>
        </Row>
      </div>
    </Media>
  )
}
