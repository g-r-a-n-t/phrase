import React from 'react'
import PropTypes from 'prop-types'
import { Media, Player, controls } from 'react-media-player'
import { Row, Col, Spinner } from 'reactstrap'

import { useIpfsFileUrl } from 'hooks/useIpfs'
import { usePhrase } from 'hooks/useEntity'
import { useMediaContext, PlayStatus, next, playing } from 'contexts/media'
import { IpfsImage, IpfsText } from 'components/IpfsMedia'
import { ProfileName } from 'components/ProfileInfo'
import { decomposeTrack } from 'tools/paths'
import { PlayPause, MuteUnmute, Time, Next, Prev, Strategy } from './Controls'

const { SeekBar, Volume } = controls

export default function TrackPlayer () {
  const [media, setMedia] = useMediaContext()
  const phrase = usePhrase(media.selection._key)
  const audio = useIpfsFileUrl(media.selection.content, 'audio/mpeg3')

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <Media>
      <div style={{ margin: '10px' }}>
        <div style={{ width: '0px', height: '0px' }}>
          <Player
            src={ audio }
            autoPlay={ true }
            onTimeUpdate={(e) => {
              // Multiple calls are made to onTimeUpdate where e.currentTime == e.duration
              // There may be issues here because of this.
              if (e.currentTime === e.duration && media.status === PlayStatus.PLAYING) {
                setMedia(next(media))
              }
            }}
            onPlay={() => {
              setMedia(playing(media))
            }}
          />
        </div>
        <Row>
          <Col>
            <AlbumThumb _key={ media.selection._key } content={media.selection.content} />
          </Col>
          <Col className="d-flex justify-content-center">
            <div className="d-flex p-2">
              <Prev /> <PlayPause /> <Next />&nbsp;
              <SeekBar style={{ width: '400px' }} />&nbsp;
              <div>
                <Time />
                <Strategy />
              </div>
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <div className="d-flex p-2">
              <MuteUnmute />&nbsp;
              <Volume style={{ width: '50px' }} />
            </div>
          </Col>
        </Row>
      </div>
    </Media>
  )
}

function AlbumThumb ({ _key, content }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col lg={{ size: 'auto' }}>
        <IpfsImage
          width="50px"
          height="50px"
          path={`${phrase.content}/cover.jpg`}
          type="image/jpeg"
        />
      </Col>
      <Col lg={{ size: 'auto' }} className="small p-2">
        <b>{ decomposeTrack(content).name } &middot; </b>
        <IpfsText path={`${phrase.content}/name.txt`} />
        <br/>
        <ProfileName account={phrase.creator} />
      </Col>
    </Row>
  )
}

AlbumThumb.propTypes = {
  _key: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}
