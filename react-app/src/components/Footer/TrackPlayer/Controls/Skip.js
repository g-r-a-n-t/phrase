import React from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'

import { useMediaContext, next, prev } from 'contexts/media'

export function Next () {
  const [media, setMedia] = useMediaContext()

  if (media == null) return null

  return <MdNavigateNext
    size={32}
    onClick={() => setMedia(next(media))}
    style={{ cursor: 'pointer' }}
  />
}

export function Prev () {
  const [media, setMedia] = useMediaContext()

  if (media == null) return null

  return <MdNavigateBefore
    size={32}
    onClick={() => setMedia(prev(media))}
    style={{ cursor: 'pointer' }}
  />
}
