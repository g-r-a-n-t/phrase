import React, { useState } from 'react'

import AlbumForm from './Album'
import PlaqueForm from './Plaque'
import FormatSelect from './FormatSelect'

export default function PhraseForm ({ onDone }) {
  const [format, setFormat] = useState(null)

  if (format === null) return (
    <FormatSelect onDone={ _format => setFormat(_format) } />
  )

  switch (format) {
    case 'ipfs-plaque-2019':
      return <PlaqueForm onDone={ onDone } />
    case 'ipfs-album-2019':
      return <AlbumForm onDone={ onDone }/>
    default:
      return <>Something went wrong.</>
  }
}
