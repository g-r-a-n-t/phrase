import React from 'react'
import { MdRepeat, MdRepeatOne } from 'react-icons/md'

import {
  useMediaContext,
  PlayStrategy,
  repeatAll,
  repeatOne,
  exhaust
}
  from 'contexts/media'

// TODO fix repleat one
export default function Strategy () {
  const [media, setMedia] = useMediaContext()

  switch (media.strategy) {
    case PlayStrategy.REPEAT_SELECTION:
      return <MdRepeatOne
        className="text-dark"
        size={16}
        onClick={() => { setMedia(exhaust(media)) }}
        style={{ cursor: 'pointer' }}
      />
    case PlayStrategy.REPEAT_SELECTIONS:
      return <MdRepeat
        className="text-dark"
        size={16}
        onClick={() => { setMedia(repeatOne(media)) }}
        style={{ cursor: 'pointer' }}
      />
    default: // PlayStrategy.EXHAUST_SELECTIONS
      return <MdRepeat
        className="text-secondary"
        size={16}
        onClick={() => { setMedia(repeatAll(media)) }}
        style={{ cursor: 'pointer' }}
      />
  }
}
