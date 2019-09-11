import React from 'react'
import PropTypes from 'prop-types'
import { withMediaProps } from 'react-media-player'

function Time ({ media: { currentTime, duration } }) {
  return (
    <div className="small">
      { `${secToMin(currentTime)} / ${secToMin(duration)}` }
    </div>
  )
}

Time.propTypes = {
  media: PropTypes.object.isRequired
}

function secToMin (_s) {
  const m = Math.round(_s / 60)
  const s = Math.round(_s) % 60
  if (s < 10) return `${m}:0${s}`
  return `${m}:${s}`
}

export default withMediaProps(Time)
