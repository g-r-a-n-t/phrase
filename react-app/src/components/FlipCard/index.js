import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import PropTypes from 'prop-types'

export default function FlipCard ({ front, back, width, height }) {
  const [flipped, setFlipped] = useState(false)

  const cardStyle = {
    width: width,
    height: height,
    overflow: 'hidden'
  }

  return (
    <div className="d-flex" style={{ cursor: 'pointer' }} onClick={() => { setFlipped(!flipped) }}>
      <ReactCardFlip isFlipped={ flipped } flipDirection="horizontal">
        <div style={ cardStyle } className="border rounded" key="front">
          { front }
        </div>
        <div style={ cardStyle } className="border rounded bg-light" key="back">
          { back }
        </div>
      </ReactCardFlip>
    </div>
  )
}

FlipCard.propTypes = {
  front: PropTypes.element.isRequired,
  back: PropTypes.element.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
}
