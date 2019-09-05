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

export function PhraseList ({ keys }) {
  debug.componentRender('PhraseGrid', keys)

  if (keys.length === 0) return <Nothing>No phrases have been created.</Nothing>

  const elements = keys.map((key) => {
    return <Phrase _key={key} />
  })

  return (
    <div className="d-flex flex-wrap justify-content-left">
      { elements }
    </div>
  )
}

PhraseList.propTypes = {
  keys: PropTypes.array
}
