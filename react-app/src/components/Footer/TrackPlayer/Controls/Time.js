import React from 'react'
import { withMediaProps } from 'react-media-player'

function Time ({ media }) {
  return (
    <div className="small">
      { `${secToMin(media.currentTime)} / ${secToMin(media.duration)}` }
    </div>
  )
}

function secToMin (_s) {
  const m = Math.round(_s / 60)
  const s = Math.round(_s) % 60
  if (s < 10) return `${m}:0${s}`
  return `${m}:${s}`
}

export default withMediaProps(Time)
