import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { IoIosHeart, IoMdOpen } from 'react-icons/io'
import { CSSTransitionGroup } from 'react-transition-group'
import { Spinner, Button } from 'reactstrap'

import { usePhrase } from 'hooks/useEntity'
import { PlaqueFront, PlaqueBack } from './Plaque'
import { AlbumFront, AlbumBack } from './Album'
import { SimpleModal } from 'components/Modals'
import ExpressSentiment from './ExpressSentiment'
import FlipCard from 'components/FlipCard'
import debug from 'tools/debug'

export function Phrase ({ _key }) {
  debug.componentRender('Phrase', _key)

  const [expressingSentiment, setExpressingSentiment] = useState(false)

  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  const [front, _back] = (() => {
    switch (phrase.format) {
      case 'ipfs-plaque-2019':
        return [
          <PlaqueFront key={ `plaqueFront-${_key}` } _key={ _key }/>,
          <PlaqueBack key={ `plaqueBack-${_key}` } _key={ _key }/>
        ]
      case 'ipfs-album-2019':
        return [
          <AlbumFront key={ `albumFront-${_key}` } _key={ _key }/>,
          <AlbumBack key={ `albumBack-${_key}` } _key={ _key }/>
        ]
      default:
        return [null, null]
    }
  })()

  const back = (
    <>
      { _back }
      <Link
        style={{ position: 'absolute', top: '5px', right: '5px' }}
        to={ `/p/${_key}` }
      >
        <IoMdOpen size={ 20 }/>
      </Link>
      <Button color="primary" className="btn-sm fixed-bottom" onClick={(e) => {
        e.stopPropagation()
        setExpressingSentiment(true)
      }}><IoIosHeart size={19}/></Button>
      <SimpleModal isOpen={ expressingSentiment } setOpen={ setExpressingSentiment }>
        <ExpressSentiment phraseKey={ _key } />
      </SimpleModal>
    </>
  )

  return <FlipCard front={ front } back={ back } width="400px" height="400px" />
}

Phrase.propTypes = {
  _key: PropTypes.string.isRequired
}

export function PhraseGrid ({ keys, cols }) {
  debug.componentRender('PhraseGrid', keys)

  const WIDTH = 410

  const elements = keys.map((key) => {
    return (
      <div key={`phrase-${key}`} style={{ margin: '5px' }}>
        <Phrase _key={key} />
      </div>
    )
  })

  return (
    <CSSTransitionGroup
      transitionName="example"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      className="d-flex flex-wrap justify-content-left"
      style={{ width: '100%', maxWidth: `${WIDTH * cols}px` }}
    >
      { elements }
    </CSSTransitionGroup>
  )
}

PhraseGrid.propTypes = {
  keys: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired
}
