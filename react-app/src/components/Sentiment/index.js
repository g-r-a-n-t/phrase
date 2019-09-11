import React from 'react'
import PropTypes from 'prop-types'
import { Spinner, Button } from 'reactstrap'

import { useSentiment } from 'hooks/useEntity'
import { IpfsImage, IpfsText } from 'components/IpfsMedia'
import { TokenAmount } from 'components/Tokens'
import FlipCard from 'components/FlipCard'
import debug from 'tools/debug'

export function Sentiment ({ _key, onSelect = null, selectText }) {
  debug.componentRender('Sentiment', _key)

  const sentiment = useSentiment(_key)

  if (sentiment == null) return <Spinner type="grow" color="secondary" />

  const front = <IpfsImage width="120px" height="120px" path={`${sentiment.content}/image120x120.jpg`} type="image/jpeg" />

  const back = (
    <>
      <div className="small font-weight-bold"><IpfsText path={`${sentiment.content}/name.txt`} /></div>
      <div className="small">
        <TokenAmount address={ sentiment.token } amount={ sentiment.value } />
      </div>
      { onSelect != null &&
        <Button className="btn-sm bg-primary border-light fixed-bottom" onClick={(e) => {
          e.stopPropagation()
          onSelect(_key)
        }}>{ selectText }</Button>
      }
    </>
  )

  return <FlipCard front={ front } back={ back } width="120px" height="120px" />
}

Sentiment.propTypes = {
  _key: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  selectText: PropTypes.string
}
