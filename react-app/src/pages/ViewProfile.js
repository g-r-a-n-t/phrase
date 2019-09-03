import React from 'react'
import PropTypes from 'prop-types'
import { IoMdHand } from 'react-icons/io'
import {
  Row, Col,
  Spinner
} from 'reactstrap'

import { useProfile, useExpressedSentiments } from '../hooks/useEntity'
import { PhraseList } from '../components/Phrase'
import { Sentiment } from '../components/Sentiment'
import { ProfileInfo } from '../components/ProfileInfo'
import { sentimentToPhrasesList } from '../tools/transformers'
import debug from '../tools/debug'

// TODO: Should hande a profile that does not have content and generate a default profile picture
export default function ViewProfile ({ match }) {
  debug.componentRender('ViewProfile', match.params.account)

  const account = match.params.account
  const profile = useProfile(account)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col xs="auto">
        <ProfileInfo account={account} />
      </Col>
      <Col>
        <div className="d-flex justify-content-around border border-light rounded">
          <ExpressedSentimentsGrid keys={profile.expressedSentiments} />
        </div>
        <br />
        <div className="border border-light rounded">
          <PhraseList keys={profile.phrases} />
        </div>
      </Col>
    </Row>
  )
}

ViewProfile.propTypes = {
  match: PropTypes.object.isRequired
}

function ExpressedSentimentsGrid ({ keys }) {
  debug.componentRender('ExpressedSentimentsGrid', keys)

  const expressedSentiments = useExpressedSentiments(keys)

  if (expressedSentiments == null) return <Spinner type="grow" color="secondary" />

  if (Object.keys(expressedSentiments).length === 0) {
    return (
      <h5 className="text-secondary text-center">
        <br />
          No sentiments have been expressed.
        <br /><br />
      </h5>
    )
  }

  const elements = sentimentToPhrasesList(
    Object.values(expressedSentiments)
  ).map((val) => {
    const selectText = (
      <>
        <b>{val.phrases.length}</b>
        <IoMdHand size={19} />
      </>
    )

    return (
      <Sentiment
        selectText={selectText}
        key={`sentiment-${val.sentiment}`}
        _key={ val.sentiment }
        onSelect={() => { console.log(val.phrases) }}
      />
    )
  })

  return (
    <div className="d-flex flex-wrap justify-content-left">
      { elements }
    </div>
  )
}
