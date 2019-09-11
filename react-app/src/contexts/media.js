import { createContext, useContext } from 'react'

import debug from '../tools/debug'

export const MediaContext = createContext()

export function useMediaContext () {
  return useContext(MediaContext)
}

export const PlayStrategy = {
  EXHAUST_SELECTIONS: 'EXHAUST_SELECTIONS',
  REPEAT_SELECTIONS: 'REPEAT_SELECTIONS',
  REPEAT_SELECTION: 'REPEAT_SELECTION'
}

export const PlayStatus = {
  DROPPED: 'DROPPED',
  LOADING: 'LOADING',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
}

export function Media (selection) {
  return {
    strategy: PlayStrategy.EXHAUST_SELECTIONS,
    status: PlayStatus.DROPPED,
    selection: selection
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

export function linkSelections (selections) {
  for (let i = 0; i < selections.length; i++) {
    if (i !== 0) selections[i].prev = selections[i - 1]
    if (i !== selections.length - 1) selections[i].next = selections[i + 1]
  }
}

export function next (media) {
  const nextSelection = (() => {
    switch (media.strategy) {
      case PlayStrategy.REPEAT_SELECTION:
        return media.selection
      case PlayStrategy.REPEAT_SELECTIONS:
        if (media.selection.next == null) return start(media.selection)
        return media.selection.next
      default: // EXHAUST_SELECTIONS - JS needs a default case
        return media.selection.next
    }
  })()

  if (nextSelection == null) return null

  return {
    status: PlayStatus.DROPPED,
    strategy: media.strategy,
    selection: nextSelection
  }
}

export function prev (media) {
  const prevSelection = (() => {
    switch (media.strategy) {
      case PlayStrategy.REPEAT_SELECTION:
        return media.selection
      case PlayStrategy.REPEAT_SELECTIONS:
        if (media.selection.prev == null) return end(media.selection)
        return media.selection.prev
      default: // EXHAUST_SELECTIONS - JS needs a default case
        return media.selection.prev
    }
  })()

  if (prevSelection == null) return null

  return {
    status: PlayStatus.DROPPED,
    strategy: media.strategy,
    selection: prevSelection
  }
}

function start (selection) {
  while (selection.prev != null) selection = selection.prev
  return selection
}

function end (selection) {
  while (selection.next != null) selection = selection.next
  return selection
}

export function playing (media) { return setStatus(media, PlayStatus.PLAYING) }
export function paused (media) { return setStatus(media, PlayStatus.PAUSED) }
export function loading (media) { return setStatus(media, PlayStatus.LOADING) }
export function dropped (media) { return setStatus(media, PlayStatus.DROPPED) }

function setStatus (media, status) {
  return {
    status: status,
    strategy: media.strategy,
    selection: media.selection
  }
}

export function repeatAll (media) { return setStrategy(media, PlayStrategy.REPEAT_SELECTIONS) }
export function repeatOne (media) { return setStrategy(media, PlayStrategy.REPEAT_SELECTION) }
export function exhaust (media) { return setStrategy(media, PlayStrategy.EXHAUST_SELECTIONS) }

function setStrategy (media, strategy) {
  return {
    status: media.status,
    strategy: strategy,
    selection: media.selection
  }
}
