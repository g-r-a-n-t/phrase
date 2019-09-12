import React, { useState } from 'react'
import { IoMdHand } from 'react-icons/io'
import PropTypes from 'prop-types'
import {
  Spinner
} from 'reactstrap'

import { useExpressedSentiments } from 'hooks/useEntity'
import { Sentiment } from 'components/Sentiment'
import { PhraseGrid } from 'components/Phrase'
import { SimpleModal } from 'components/Modal'
import { sentimentToPhrasesList, sentimentToPhrasesMap } from 'tools/transformers'
import debug from 'tools/debug'

export function ExpressedSentimentsGrid ({ keys }) {
  debug.componentRender('ExpressedSentimentsGrid', keys)

  const [selectedSentiment, setSelectedSentiment] = useState(null)

  const expressedSentiments = useExpressedSentiments(keys)

  if (expressedSentiments == null) return <Spinner type="grow" color="secondary" />

  const elements = sentimentToPhrasesList(
    Object.values(expressedSentiments)
  ).map((val) => {
    const selectText = <><b>{val.phrases.length}</b> <IoMdHand size={19} /></>

    return (
      <div key={`sentiment-${val.sentiment}`} style={{ margin: '5px' }}>
        <Sentiment
          selectText={selectText}
          _key={ val.sentiment }
          onSelect={() => { setSelectedSentiment(val.sentiment) }}
        />
      </div>
    )
  })

  return (
    <div className="d-flex flex-wrap justify-content-left">
      { elements }
      { selectedSentiment !== null &&
        <SimpleModal
          onDone={() => { setSelectedSentiment(null) }}
          width="860px"
        >
          <PhraseGrid
            keys={ sentimentToPhrasesMap(Object.values(expressedSentiments))[selectedSentiment] }
          />
        </SimpleModal>
      }
    </div>
  )
}

ExpressedSentimentsGrid.propTypes = {
  keys: PropTypes.array.isRequired
}
