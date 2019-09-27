import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useExtExpressedSentiments } from 'hooks/useEvents'
import { Sentiment } from 'components/Sentiment'
import { ProfileThumb } from 'components/Profile'
import { sentimentToExpressersMap } from 'tools/transformers'
import { SimpleModal } from 'components/Modals'

export default function ExpressedSentiments ({ phrase }) {
  const [selection, setSelection] = useState(null)
  const events = useExtExpressedSentiments()

  if (events == null) return null

  const sentimentToExpressers = sentimentToExpressersMap(
    events.filter(e => e.phrase === phrase)
  )

  return (
    <>
      <Sentiments
        sToE={ sentimentToExpressers }
        onSelect={ setSelection }
      />
      <SimpleModal
        isOpen={ selection != null }
        setOpen={ b => { if (!b) setSelection(null) }}
      >
        <Expressers keys={ sentimentToExpressers[selection] } />
      </SimpleModal>
    </>
  )
}

ExpressedSentiments.propTypes = {
  phrase: PropTypes.string.isRequired
}

function Sentiments ({ sToE, onSelect }) {
  const elements = Object.keys(sToE).map(key => {
    return (
      <div key={ `sentiment-phraseview-${key}` } style={{ margin: '5px' }}>
        <Sentiment
          _key={ key }
          onSelect={ () => onSelect(key) }
          selectText={ sToE[key].length }
        />
      </div>
    )
  })

  return (
    <div className="d-flex flex-wrap">
      { elements }
    </div>
  )
}

Sentiments.propTypes = {
  sToE: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
}

function Expressers ({ keys }) {
  if (!keys) return null

  const elements = keys.map(key => {
    return (
      <div key={`expresser-${key}`} style={{ margin: '5px' }}>
        <ProfileThumb _key={ key }/>
      </div>
    )
  })

  return (
    <div className="d-flex flex-wrap">
      { elements }
    </div>
  )
}

Expressers.propTypes = {
  keys: PropTypes.array.isRequired
}
