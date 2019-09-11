
const TRACK = /^(.+)\/(\d{2}) (.+)\.mp3$/

export function isTrack (path) {
  return TRACK.test(path)
}

export function decomposeTrack (path) {
  const [trackPath, albumPath, number, name] = path.match(TRACK)

  return {
    trackPath: trackPath,
    albumPath: albumPath,
    number: number,
    name: name
  }
}
