import React from 'react'
import { IoIosPlayCircle, IoIosPause } from 'react-icons/io'
import {
  ListGroup, ListGroupItem,
  Spinner
} from 'reactstrap'

import { usePhrase } from '../../hooks/useEntity'
import { useIpfsFileList, useIpfsFileUrl } from '../../hooks/useIpfs'
import { useMediaSelectionContext, TrackSelection, linkSelections } from '../../contexts/mediaSelection'
import { IpfsImage, IpfsText } from '../IpfsMedia'
import { ProfileName } from '../../components/ProfileInfo'
import { decomposeTrack, isTrack } from '../../tools/paths'
import debug from '../../tools/debug'

export function AlbumThumb ({ _key }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <>
      <IpfsImage
        width="50px"
        height="50px"
        path={`${phrase.content}/cover.jpg`}
        type="image/jpeg"
      />
      <IpfsText path={`${phrase.content}/name.txt`} />
      <ProfileName _key={phrase.creator} />
    </>
  )
}

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

export function AlbumBack ({ _key }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <div style={{ margin: '10px' }}>
      <div>
        <IpfsText path={`${phrase.content}/name.txt`} />
      </div>
      <div className="small" style={{marginTop: '-3px', marginBottom: '5px'}}>
        <ProfileName account={ phrase.creator } />
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

export function Track ({ selection }) {
  debug.componentRender('IpfsTrack', selection)

  const [mediaSelection, setMediaSelection] = useMediaSelectionContext()

  const track = decomposeTrack(selection.content)

  return (
    <div
      className="small bg-white border"
      style={{padding: '1px', marginBottom: '1px'}}
      onClick={e => {
        e.stopPropagation()
        setMediaSelection(selection)
      }}
    >
      <IoIosPlayCircle size={18} /> { track.number }. <b>{ track.name }</b>
    </div>
  )
}
