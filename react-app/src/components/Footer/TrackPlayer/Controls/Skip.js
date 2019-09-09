import React from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'

import { useMediaSelectionContext } from '../../../../contexts/mediaSelection'

export function Next () {
  const [mediaSelection, setMediaSelection] = useMediaSelectionContext()

  if (mediaSelection == null) return null

  return <MdNavigateNext
    size={32}
    onClick={() => setMediaSelection(mediaSelection.next)}
    style={{cursor: 'pointer'}}
  />
}


export function Prev () {
  const [mediaSelection, setMediaSelection] = useMediaSelectionContext()

  if (mediaSelection == null) return null

  return <MdNavigateBefore
    size={32}
    onClick={() => setMediaSelection(mediaSelection.prev)}
    style={{cursor: 'pointer'}}
  />
}
