import React, { useState } from 'react'
import { IoMdHand } from 'react-icons/io'
import {
  Spinner
} from 'reactstrap'


import { useExpressedSentiments } from '../../hooks/useEntity'
import { Sentiment } from '../../components/Sentiment'
import { Nothing } from '../../components/Wrappers'
import { PhraseList } from '../../components/Phrase'
import { SimpleModal } from '../../components/Modal'
import { sentimentToPhrasesList, sentimentToPhrasesMap } from '../../tools/transformers'
import debug from '../../tools/debug'

export function ExpressedSentimentsGrid ({ keys }) {
  debug.componentRender('ExpressedSentimentsGrid', keys)

  const [selectedSentiment, setSelectedSentiment] = useState(null)

  const expressedSentiments = useExpressedSentiments(keys)

  if (expressedSentiments == null) return <Spinner type="grow" color="secondary" />
  if (Object.keys(expressedSentiments).length === 0) return <Nothing>No sentiments have been expressed</Nothing>

  const elements = sentimentToPhrasesList(
    Object.values(expressedSentiments)
  ).map((val) => {
    const selectText = <><b>{val.phrases.length}</b> <IoMdHand size={19} /></>

    return (
      <Sentiment
        selectText={selectText}
        key={`sentiment-${val.sentiment}`}
        _key={ val.sentiment }
        onSelect={() => { setSelectedSentiment(val.sentiment) }}
      />
    )
  })

  return (
    <>
      { selectedSentiment !== null &&
        <SimpleModal onDone={() => { setSelectedSentiment(null) }}>
          <PhraseList keys={ sentimentToPhrasesMap(Object.values(expressedSentiments))[selectedSentiment] } />
        </SimpleModal>
      }
      <div className="d-flex flex-wrap justify-content-left">
        { elements }
      </div>
    </>
  )
}
