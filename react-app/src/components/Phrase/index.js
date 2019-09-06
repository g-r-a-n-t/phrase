import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IoIosHeart } from 'react-icons/io'
import {
  Spinner, Button
} from 'reactstrap'

import { usePhrase } from '../../hooks/useEntity'
import { IpfsImage, IpfsText } from '../IpfsMedia'
import { Nothing } from '../Wrappers'
import FlipCard from '../FlipCard'
import ExpressSentimentModal from './ExpressSentimentModal'
import debug from '../../tools/debug'

export function Phrase ({ _key }) {
  debug.componentRender('Phrase', _key)

  const [expressingSentiment, setExpressingSentiment] = useState(false)

  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  const front = (
    <IpfsImage width="400px" height="400px" path={`${phrase.content}/image400x400.jpg`} type="image/jpeg" />
  )

  const back = (
    <>
      <div style={{margin: '8px'}}>
        <h3 className="fluid"><IpfsText path={`${phrase.content}/name.txt`} /></h3>
        <IpfsText path={`${phrase.content}/description.txt`} />
        <Button className="btn-sm fixed-bottom float-right" onClick={(e) => {
          e.stopPropagation()
          setExpressingSentiment(true)
        }}><IoIosHeart size={19}/></Button>
      </div>
      { expressingSentiment &&
        <ExpressSentimentModal phraseKey={_key} onDone={() => {
          setExpressingSentiment(false)
        }}/>
      }
    </>
  )

  return <FlipCard front={front} back={back} width="400px" height="400px" />
}


Phrase.propTypes = {
  _key: PropTypes.string.isRequired
}

export function PhraseGrid ({ keys }) {
  debug.componentRender('PhraseGrid', keys)

  const elements = keys.reverse().map((key) => {
    return (
      <div key={`phrase-${key}`} style={{ margin: '5px' }}>
        <Phrase _key={key} />
      </div>
    )
  })

  // Max-width hack to keep items center
  // TODO: try to improve this
  return (
    <div className="d-flex flex-wrap justify-content-left" style={{maxWidth: '1230px'}}>
      { elements }
    </div>
  )
}

PhraseGrid.propTypes = {
  keys: PropTypes.array
}
