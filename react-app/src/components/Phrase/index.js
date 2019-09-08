import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IoIosHeart } from 'react-icons/io'
import {
  Spinner, Button
} from 'reactstrap'

import { usePhrase } from '../../hooks/useEntity'
import { PlaqueFront, PlaqueBack} from './Plaque'
import { AlbumFront, AlbumBack} from './Album'
import ExpressSentimentModal from './ExpressSentimentModal'
import FlipCard from '../FlipCard'
import debug from '../../tools/debug'

export function Phrase ({ _key }) {
  debug.componentRender('Phrase', _key)

  const [expressingSentiment, setExpressingSentiment] = useState(false)

  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  const [front, _back] = (() => {
    switch(phrase.format) {
      case 'ipfs-plaque-2019':
        return [
          <PlaqueFront _key={ _key }/>,
          <PlaqueBack _key={ _key }/>
        ]
      case 'ipfs-album-2019':
        return [
          <AlbumFront _key={ _key }/>,
          <AlbumBack _key={ _key }/>
        ]
      default:
        return [null, null]
    }
  })()


  const back = (
    <>
      { _back }
      <Button className="btn-sm fixed-bottom" onClick={(e) => {
        e.stopPropagation()
        setExpressingSentiment(true)
      }}><IoIosHeart size={19}/></Button>
      { expressingSentiment &&
        <ExpressSentimentModal phraseKey={_key} onDone={() => {
          setExpressingSentiment(false)
        }}/>
      }
    </>
  )

  return <FlipCard front={ front } back={ back } width="400px" height="400px" />
}

Phrase.propTypes = {
  _key: PropTypes.string.isRequired
}

export function PhraseGrid ({ keys, width }) {
  debug.componentRender('PhraseGrid', keys)

  const elements = keys.map((key) => {
    return (
      <div key={`phrase-${key}`} style={{ margin: '5px' }}>
        <Phrase _key={key} />
      </div>
    )
  })

  return (
    <div className="d-flex flex-wrap justify-content-left" style={{width: width}}>
      { elements }
    </div>
  )
}

PhraseGrid.propTypes = {
  keys: PropTypes.array
}
