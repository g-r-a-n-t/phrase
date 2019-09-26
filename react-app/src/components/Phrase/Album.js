import React from 'react'
import PropTypes from 'prop-types'
import { MdPlayCircleOutline, MdPauseCircleOutline, MdFileDownload } from 'react-icons/md'
import { Spinner, Row, Col } from 'reactstrap'

import { usePhrase } from 'hooks/useEntity'
import { useIpfsFileList } from 'hooks/useIpfs'
import { useMediaContext, TrackSelection, PlayStatus, Media, linkSelections, paused, playing } from 'contexts/media'
import { IpfsImage, IpfsText } from 'components/IpfsMedia'
import { ProfileName } from 'components/Profile'
import { decomposeTrack, isTrack } from 'tools/paths'
import debug from 'tools/debug'

export function AlbumFront ({ _key }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <IpfsImage
      width="400px"
      height="400px"
      path={`${phrase.content}/cover.jpg`}
      type="image/jpeg"
    />
  )
}

AlbumFront.propTypes = {
  _key: PropTypes.string.isRequired
}

export function AlbumBack ({ _key }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <div style={{ margin: '10px' }}>
      <div>
        <IpfsText path={`${phrase.content}/name.txt`} />
      </div>
      <div className="small" style={{ marginTop: '-3px', marginBottom: '5px' }}>
        <ProfileName _key={ phrase.creator } />
      </div>
      <div>
        <Tracks
          _key={ _key }
          content={ phrase.content }
        />
      </div>
    </div>
  )
}

export function AlbumExploded ({ _key }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col>
        <h5><IpfsText path={`${phrase.content}/name.txt`} /></h5>
        <p>
          Created by <ProfileName _key={ phrase.creator } />.
        </p>
        <Tracks
          _key={ _key }
          content={ phrase.content }
        />
      </Col>
      <Col className="text-right">
        <IpfsImage
          width="400px"
          height="400px"
          path={`${phrase.content}/cover.jpg`}
          type="image/jpeg"
        />
      </Col>
    </Row>
  )
}

AlbumBack.propTypes = {
  _key: PropTypes.string.isRequired
}

export function Tracks ({ _key, content }) {
  debug.componentRender('IpfsTracks', _key)

  const phrase = usePhrase(_key)
  const files = useIpfsFileList(content)

  if (phrase == null || files == null) return <Spinner type="grow" color="secondary" />

  const filePaths = files.map(file => `${content}/${file}`)
  const trackPaths = filePaths.filter(filePath => isTrack(filePath))
  const selections = trackPaths.map(trackPath => TrackSelection(_key, trackPath))

  linkSelections(selections) // modifies the list objects prev and next values

  const elements = selections.map(selection =>
    <Track
      key={`track-${selection.content}`}
      selection={ selection }
    />
  )

  return (
    <div>
      { elements }
    </div>
  )
}

Tracks.propTypes = {
  _key: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

// TODO: clean this up
export function Track ({ selection }) {
  debug.componentRender('IpfsTrack', selection)

  const [media, setMedia] = useMediaContext()

  const track = decomposeTrack(selection.content)

  if (media == null || media.selection.content !== selection.content) {
    return (
      <div
        className="small bg-white border"
        style={{ padding: '1px', marginBottom: '1px' }}
        onClick={e => {
          e.stopPropagation()
          setMedia(Media(selection))
        }}
      >
        <MdPlayCircleOutline size={20} />
        &nbsp; { track.number }. <b>{ track.name }</b>
      </div>
    )
  }

  switch (media.status) {
    case PlayStatus.PLAYING:
      return (
        <div
          className="small bg-light border"
          style={{ padding: '1px', marginBottom: '1px' }}
          onClick={e => {
            e.stopPropagation()
            setMedia(paused(media))
          }}
        >
          <MdPauseCircleOutline size={20} />
          &nbsp; { track.number }. <b>{ track.name }</b>
        </div>
      )
    case PlayStatus.PAUSED:
      return (
        <div
          className="small bg-light border"
          style={{ padding: '1px', marginBottom: '1px' }}
          onClick={e => {
            e.stopPropagation()
            setMedia(playing(media))
          }}
        >
          <MdPlayCircleOutline size={20} />
          &nbsp; { track.number }. <b>{ track.name }</b>
        </div>
      )
    default:
      return (
        <div
          className="small bg-light border"
          style={{ padding: '1px', marginBottom: '1px' }}
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <MdFileDownload size={20} />
          &nbsp; { track.number }. <b>{ track.name }</b>
        </div>
      )
  }
}

Track.propTypes = {
  selection: PropTypes.object.isRequired
}
