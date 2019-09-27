import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Spinner, Button } from 'reactstrap'

import { useSentiment } from 'hooks/useEntity'
import { IpfsImage, IpfsText } from 'components/IpfsMedia'
import { TokenAmount } from 'components/Tokens'
import FlipCard from 'components/FlipCard'
import debug from 'tools/debug'

export function Sentiment ({
  _key,
  onFlip = () => {},
  onSelect = () => {},
  selectText = null
}) {
  debug.componentRender('Sentiment', _key)

  const sentiment = useSentiment(_key)

  if (sentiment == null) return <Spinner type="grow" color="secondary" />

  const front = <IpfsImage
    width="120px"
    height="120px"
    path={`${sentiment.content}/cover.jpg`}
    type="image/jpeg"
  />

  const back = (
    <div style={{ margin: '3px' }}>
      <div className="small font-weight-bold">
        <IpfsText path={`${sentiment.content}/name.txt`} />
      </div>
      <div className="small">
        <TokenAmount address={ sentiment.token } amount={ sentiment.value } />
      </div>
      { selectText != null &&
        <Button className="btn-sm bg-primary border-light fixed-bottom" onClick={(e) => {
          e.stopPropagation()
          onSelect(_key)
        }}>{ selectText }</Button>
      }
    </div>
  )

  return <FlipCard front={ front } back={ back } onFlip={ onFlip } width="120px" height="120px" />
}

Sentiment.propTypes = {
  _key: PropTypes.string.isRequired,
  onFlip: PropTypes.func,
  onSelect: PropTypes.func,
  selectText: PropTypes.node
}

export function SentimentGrid ({ keys, onFlip = () => {} }) {
  const [flipped, setFlipped] = useState(new Set())

  const elements = keys.map(key => {
    return (
      <div key={ `sentiment-${key}` } style={{ margin: '5px' }}>
        <Sentiment _key={ key } onFlip={isFlipped => {
          const newFlipped = flipped
          if (isFlipped) {
            newFlipped.add(key)
          } else {
            newFlipped.delete(key)
          }

          setFlipped(newFlipped)
          onFlip(Array.from(newFlipped))
        }}/>
      </div>
    )
  })

  return (
    <div className="d-flex flex-wrap">
      { elements }
    </div>
  )
}

SentimentGrid.propTypes = {
  keys: PropTypes.array.isRequired,
  onFlip: PropTypes.func
}
