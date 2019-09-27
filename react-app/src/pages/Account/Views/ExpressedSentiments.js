import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { Spinner, Collapse } from 'reactstrap'

import { useExpressedSentiments } from 'hooks/useEntities'
import { SentimentGrid } from 'components/Sentiment'
import { PhraseGrid } from 'components/Phrase'
import { sentimentToPhrasesMap } from 'tools/transformers'
import debug from 'tools/debug'

export function ExpressedSentiments ({ keys }) {
  debug.componentRender('ExpressedSentimentsGrid', keys)

  const [selectedSentiments, setSelectedSentiments] = useState([])

  const expressedSentiments = useExpressedSentiments(keys)

  if (expressedSentiments == null) return <Spinner type="grow" color="secondary" />

  const sentimentToPhrases = sentimentToPhrasesMap(Object.values(expressedSentiments))

  return (
    <>
      <div className="d-flex justify-content-center">
        <SentimentGrid
          keys={ Object.keys(sentimentToPhrases) }
          onFlip={flipped => {
            setSelectedSentiments(flipped)
          }}
        />
      </div>
      <Collapse isOpen={ selectedSentiments.length !== 0 }>
        <div className="text-center text-secondary">
          <MdKeyboardArrowDown size={32}/>
        </div>
        <div
          className="d-flex justify-content-center bg-light"
        >
          <PhraseGrid
            cols={ 3 }
            keys={ selectedSentiments.reduce((phrases, sentiment) => {
              return phrases.concat(sentimentToPhrases[sentiment])
            }, [])}
          />
        </div>
        <div className="text-center text-secondary">
          <MdKeyboardArrowUp size={32}/>
        </div>
      </Collapse>
    </>
  )
}

ExpressedSentiments.propTypes = {
  keys: PropTypes.array.isRequired
}
