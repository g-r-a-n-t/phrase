import { createContext, useContext } from 'react'

import debug from '../tools/debug'

export const MediaSelectionContext = createContext()

export function useMediaSelectionContext () {
  return useContext(MediaSelectionContext)
}

export function linkSelections (selections) {
  for (let i = 0; i < selections.length; i++) {
    if (i !== 0) selections[i].prev = selections[i - 1]
    if (i !== selections.length - 1) selections[i].next = selections[i + 1]
  }
}

export function TrackSelection (_key, content) {
  return {
    type: 'track',
    _key: _key,
    content: content,
    next: null,
    prev: null
  }
}
