import React from 'react'
import PropTypes from 'prop-types'
import { withMediaProps } from 'react-media-player'
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md'

function MuteUnmute ({ media: { isMuted, muteUnmute } }) {
  return (
    <div onClick={muteUnmute} style={{ cursor: 'pointer' }}>
      { isMuted
        ? <MdVolumeOff size={32}/>
        : <MdVolumeUp size={32}/>
      }
    </div>
  )
}

MuteUnmute.propTypes = {
  media: PropTypes.object.isRequired
}

export default withMediaProps(MuteUnmute)
